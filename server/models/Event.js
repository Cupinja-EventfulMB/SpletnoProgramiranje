import mongoose from "mongoose";
import { Schema } from "mongoose";

const EventSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50,
    },

    institution: {
      type: Schema.Types.ObjectId,
      ref: "institution",
      required: false,
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

    images: {
      type: [String],
      required: false,
    },
    
    description: {
      type: String,
      required: true,
    },

    category: {
      type: Array,
      required: true,
    },

    going: [{
      type: Schema.Types.ObjectId,
      ref: "users",
    }],

    interested: [{
      type: Schema.Types.ObjectId,
      ref: "users",
    }],

    duration: {
      type: Number,
      required: false,
    },

    ticketPrice: {
      type: Number,
      required: false,
    },

    date: {
      type: Date,
      required: true,
    }

});

EventSchema.index({ location: "2dsphere" });

const Event = mongoose.model("Event", EventSchema);
export default Event;
