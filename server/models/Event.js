import mongoose from "mongoose";
import { Schema } from "mongoose";

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: mongoose.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: Array,
    required: false,
  },
  going: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
      default: [],
    },
  ],

  interested: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
      default: [],
    },
  ],

  duration: {
    type: Number,
    required: false,
  },

  ticketPrice: {
    type: Number,
    required: false,
  },
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
