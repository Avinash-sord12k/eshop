import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  permissions: [{
    resource: String,
    actions: [String],
  }],
  description: String,
});

const Role = mongoose.models.Roles || mongoose.model("Roles", roleSchema);

export default Role;