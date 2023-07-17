import { hashPassword, comparePassword } from "../helpers/helper_auth.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., 'gmail'
  auth: {
    user: "amitjaisinghanitesting@gmail.com",
    pass: "ocjhebwwilqfbkpy",
  },
});

const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const registerCont = async (req, res) => {
  try {
    const { name, email, password, address, phone, answer, otp } = req.body;
    //validating the entries
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    if (!otp) {
      return res.send({ message: "Answer is required" });
    }

    //existing user check
    const userExisting = await userModel.findOne({ email });
    if (userExisting) {
      return res.status(200).send({
        success: true,
        message: "User Already exists !",
      });
    }

    const verify_user_otp = await otpModel.findOne({ email });

    if (verify_user_otp.otp != otp) {
      return res.status(200).send({
        success: false,
        message: "OTP Incorrect !",
      });
    }

    const hashed_password = await hashPassword(password);
    // const OTP = generateOTP();

    const user = await new userModel({
      name,
      email,
      address,
      phone,
      answer,
      password: hashed_password,
      otp,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });

    // Send OTP to the user's email
    // const mailOptions = {
    //   from: "amitjaisinghanitesting@gmail.com",
    //   to: req.body.email,
    //   subject: "Registration OTP",
    //   text: `Your OTP for registration is: ${OTP}`,
    // };

    // await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export const loginCont = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log("Token  ", token);
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        ClickedProducts: user.ClickedProducts,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// OTP verification
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by username
    const user = await userModel.findOne({ email });

    // Verify the entered OTP
    if (user && user.otp === otp) {
      // OTP is valid, proceed with registration
      user.otp = ""; // Clear the OTP field
      await user.save();

      res.json({
        success: true,
        message: "OTP verification successful. Registration completed.",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP." });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during OTP verification.",
    });
  }
};

//forgot password
export const forgotPasswordCont = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "Email is required",
      });
    }

    if (!answer) {
      return res.status(404).send({
        success: false,
        message: "Answer is required",
      });
    }

    if (!newPassword) {
      return res.status(404).send({
        success: false,
        message: "New Password is required",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Incorrect details",
      });
    }
    const hashed_pass = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed_pass });
    res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const testCont = (req, res) => {
  try {
    res.send("protected");
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileCont = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    const user = await userModel.findById(req.user_id);

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully !!!",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in updating profile",
      error,
    });
  }
};

export const getOrdersCont = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("product", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in fetching orders",
      error,
    });
  }
};

export const getAllOrdersCont = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("product", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in fetching orders",
      error,
    });
  }
};

export const OrderStatusCont = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Updating Status",
      error,
    });
  }
};
// new

export const otpsend = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // User Already Exist
    const userExisting = await userModel.findOne({ email });
    if (userExisting) {
      return res.status(200).send({
        success: false,
        message: "User Already exists !",
      });
    }

    // OTP
    const OTP = generateOTP();

    const existingOTP = await otpModel.findOne({ email });
    if (existingOTP) {
      // If an OTP record exists, update the OTP field with the new OTP
      existingOTP.otp = OTP;
      await existingOTP.save();
    } else {
      // If no OTP record exists, create a new OTP record
      await new otpModel({ email, otp: OTP }).save();
    }

    const mailOptions = {
      from: "amitjaisinghanitesting@gmail.com",
      to: req.body.email,
      subject: "Registration OTP",
      text: `Your OTP for registration is: ${OTP}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).send({
      success: true,
      message: "OTP SEND Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "OTP Registration Problem",
      error,
    });
  }
};
