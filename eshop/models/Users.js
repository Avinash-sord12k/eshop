import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "shopper"],
    default: "user",
  },
  resetOtp: Number,
  resetOtpExpiry: Date,
  verificationToken: String,
  verificationTokenExpiry: Date,
})

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;