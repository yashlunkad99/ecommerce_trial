import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from "fs";
import jwt from "jsonwebtoken";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
import users from "../models/userModel.js";
import { spawn } from "child_process";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductCont = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!description) {
      return res.send({ message: "Description is required" });
    }
    if (!price) {
      return res.send({ message: "Price is required" });
    }
    if (!category) {
      return res.send({ message: "Category is required" });
    }
    if (!quantity) {
      return res.send({ message: "Quantity is required" });
    }
    if (!photo && photo.size > 1000000) {
      return res.send({ message: "Photo is required & Less than 1mb" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Creating Product",
    });
  }
};

export const displayProductCont = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Displaying Product",
    });
  }
};

export const displaySingleProductCont = async (req, res) => {
  try {
    const products = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    const productId = products._id;
    if (req.headers.authorization) {
      const token = req.headers.authorization || req.query.token;

      // Verify and decode the JWT token
      const decodedToken = jwt.verify(token, "HGFHGEAD1212432432");

      // Access the user ID from the decoded token
      const userId = decodedToken._id;

      console.log(userId);
      console.log(productId);

      const uu = await users.findOne({ _id: userId });

      const demoArray = uu.ClickedProducts;

      for (let j = 8; j >= 0; j--) {
        demoArray[j + 1] = demoArray[j];
      }
      demoArray[0] = productId;
      uu.ClickedProducts = demoArray;
      uu.save();
    }
    res.status(200).send({
      success: true,
      message: "Single product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Displaying Product",
    });
  }
};

export const productPhotoCont = async (req, res) => {
  try {
    const products = await productModel
      .findById(req.params.pid)
      .select("photo");
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Displaying Product Photo",
    });
  }
};
export const deleteProductCont = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully !!!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Cannot delete Product !!",
    });
  }
};

export const updateProductCont = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
export const productFiltersCont = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};

// product count
export const productCountCont = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListCont = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductCont = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductCont = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};
// New Function
export const displayRecommendedProductCont = async (req, res) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization || req.query.token;

      // Verify and decode the JWT token
      const decodedToken = jwt.verify(token, "HGFHGEAD1212432432");

      // Access the user ID from the decoded token
      const userId = decodedToken._id;

      console.log(userId);

      const uu = await users.findOne({ _id: userId });
      console.log(uu.name, "Amit");
      let products = [];

      const FetchClicked = uu.ClickedProducts[0];
      const pp = await productModel.findOne({ _id: FetchClicked });
      // console.log(pp.name);
      let inputpick = pp.name;

      const childPython = spawn("python", ["demo.py", inputpick]);

      let output = {}; // Variable to store the output

      childPython.stdout.on("data", (data) => {
        console.log(typeof data);
        output = data.toString("utf8");
        console.log(`stdout: ${data}`);
      });

      childPython.stderr.on("data", (data) => {
        console.log(`stderr: ${data}`);
        console.log(`${output}`);
      });

      childPython.on("close", async (code) => {
        console.log(`Child process exited with code: ${code}`);
        console.log(output);
        const regex = /'([^']+)'/g;
        const matches = output.match(regex);
        const ids = matches.map((match) => match.slice(1, -1));

        console.log(ids[0]);

        for (let k = 0; k <= 3; k++) {
          const pp = await productModel.findOne({ _id: ids[k] });
          products.push(pp);
        }

        console.log(products, "amit");
        res.status(200).send({
          success: true,
          products,
        });
      });

      // console.log(products, "amit");
      // res.status(200).send({
      //   success: true,
      //   products,
      // });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get product by category
export const productCategoryCont = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
//token
export const braintreeTokenCont = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentCont = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            product: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          // Create an array of update operations to perform in bulk

          const bulkUpdateOps = cart.map(({ _id, quantity }) => ({
            updateOne: {
              filter: { _id: _id },

              update: { $inc: { quantity: -1 } },
            },
          }));

          // Perform the bulk update operation

          productModel.bulkWrite(bulkUpdateOps);
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const sellingProductCont = async (req, res) => {
  try {
    const highSellingProducts = await productModel.find({
      quantity: { $gt: 0, $lt: 9 },
    });
    res.status(200).send({
      success: true,
      highSellingProducts,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error,
      message: "Error While fetching products",
    });
  }
};
