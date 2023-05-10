import mongoose from "mongoose";
import { Schema } from "mongoose";

const NotificationSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
      min: 3,
    },

    event: {
      type: Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["event", "reminder"],
    },

});

const Event = mongoose.model("Notification", NotificationSchema);
export default Event;