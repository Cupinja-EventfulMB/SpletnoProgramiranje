import mongoose from "mongoose";
import { Schema } from "mongoose";

const InstitutionSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50,
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: false,
      max: 15,
      unique: true,
    },

    address: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    mainImage: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: false,
    },
    
    description: {
      type: String,
      required: false,
    },
  });
  
  InstitutionSchema.index({ location: "2dsphere" });
  
  const Institution = mongoose.model("Institution", InstitutionSchema);
  export default Institution;  