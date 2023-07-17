import Express from "express";
import {
  registerCont,
  loginCont,
  testCont,
  forgotPasswordCont,
  updateProfileCont,
  getOrdersCont,
  getAllOrdersCont,
  OrderStatusCont,
  otpsend,
} from "../controllers/authController.js";
import { requireSignIn, adminAccess } from "../middelwares/authMiddelware.js";
import { verify } from "jsonwebtoken";

//router object
const router = Express.Router();

//calling object
router.post("/register", registerCont);

//otp route
//router.post("/verify-otp", verifyOtp);
//LOGIN CONTROLLER
router.post("/login", loginCont);

//OTP SEND
router.post("/send-otp", otpsend);

//forget password
router.post("/forgot-password", forgotPasswordCont);

//test json web token
router.get("/test", requireSignIn, adminAccess, testCont);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, adminAccess, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignIn, updateProfileCont);

router.get("/orders", requireSignIn, getOrdersCont);

router.get("/all-orders", requireSignIn, adminAccess, getAllOrdersCont);

router.put(
  "/order-status/:orderId",
  requireSignIn,
  adminAccess,
  OrderStatusCont
);
export default router;
