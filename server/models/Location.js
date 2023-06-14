import mongoose from "mongoose";
import { Schema } from "mongoose";

const LocationSchema = new mongoose.Schema({
    institution: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
});

const Location = mongoose.model("Location", LocationSchema);
export default Location;
