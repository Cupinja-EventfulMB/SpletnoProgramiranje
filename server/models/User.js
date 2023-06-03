import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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

  phoneNumber: {
    type: String,
    required: false,
    max: 15,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },
 
  IPaddress: {
    type: String,
    required: false,
  },   

  address: {
    type: String,
    required: false,
  },

  favoriteCategories: {
    type: Array,
    required: false,
  },

  events: {
    going: { 
      type: Schema.Types.ObjectId,
      ref: "events",
    },
    interested: { 
      type: Schema.Types.ObjectId,
      ref: "events",
    },
  },

  notifications:  [{
    type: Schema.Types.ObjectId,
    ref: "notifications",
  }],

});

const User = mongoose.model("User", UserSchema);
export default User;