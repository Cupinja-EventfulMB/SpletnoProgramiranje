import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  body: {
    type: String,
    required: true,
  },

  category: {
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

  time: {
    type: Date,
    required: true,
  },
});

MessageSchema.index({ location: "2dsphere" }); 

const Message = mongoose.model("Message", MessageSchema);
export default Message;
