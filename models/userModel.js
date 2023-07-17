import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    otp: { type: String },
    role: {
      type: Number,
      default: 0,
    },
    ClickedProducts: {
      type: [String],
      default: ["", "", "", "", "", "", "", "", "", ""],
      validate: {
        validator: function (arr) {
          return arr.length <= 10;
        },
        message: "Array length exceeds the maximum allowed size of 10.",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
