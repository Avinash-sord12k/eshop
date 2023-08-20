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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    default: () => mongoose.Types.ObjectId('64de22a0d9ec62d9e5f89323'),
  },
  resetOtp: Number,
  resetOtpExpiry: Date,
  verificationToken: String,
  verificationTokenExpiry: Date,
})

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;