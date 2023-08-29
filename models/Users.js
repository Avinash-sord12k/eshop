import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Existing fields
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
  
  // New shopper-specific fields
  image: String,
  address: String,
  contactEmail: String,
  contactPhone: String,
  description: String,
  businessType: String,
  products: [String],
  services: String,
  companyGrowth: String,
  stockExchange: String,
  startedYear: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
  },
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
