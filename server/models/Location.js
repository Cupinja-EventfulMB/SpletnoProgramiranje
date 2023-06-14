import mongoose from "mongoose";
import { Schema } from "mongoose";

const LocationSchema = new Schema({
    institution: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    }
});

const Location = mongoose.model("Location", LocationSchema);
export default Location;
