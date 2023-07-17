import express from "express";
import { requireSignIn, adminAccess } from "../middelwares/authMiddelware.js";
import {
  brainTreePaymentCont,
  braintreeTokenCont,
  createProductCont,
  deleteProductCont,
  displayProductCont,
  displaySingleProductCont,
  productCategoryCont,
  productCountCont,
  productFiltersCont,
  productListCont,
  productPhotoCont,
  realtedProductCont,
  searchProductCont,
  updateProductCont,
  displayRecommendedProductCont,
  sellingProductCont,
} from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  adminAccess,
  ExpressFormidable(),
  createProductCont
);
router.get("/display-product", displayProductCont);
router.get("/recommended-display-product/", displayRecommendedProductCont);
router.get("/display-product/:slug", displaySingleProductCont);
router.get("/display-photo/:pid", productPhotoCont);
router.delete("/delete-product/:pid", deleteProductCont);
router.get("/sellingProduct", sellingProductCont);
router.put(
  "/update-product/:pid",
  requireSignIn,
  adminAccess,
  ExpressFormidable(),
  updateProductCont
);

//filter product
router.post("/product-filters", productFiltersCont);

//product count
router.get("/product-count", productCountCont);

//product per page
router.get("/product-list/:page", productListCont);

//search product
router.get("/search/:keyword", searchProductCont);

//similar product
router.get("/related-product/:pid/:cid", realtedProductCont);

//category wise product
router.get("/product-category/:slug", productCategoryCont);

//payments routes
//token
router.get("/braintree/token", braintreeTokenCont);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentCont);

//recommended product fetch

export default router;
