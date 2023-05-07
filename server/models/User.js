import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },

  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    min: 4,
  },

});

const User = mongoose.model("User", UserSchema);
export default User;
