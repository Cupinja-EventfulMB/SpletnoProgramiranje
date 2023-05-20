import mongoose from "mongoose";
import { Schema } from "mongoose";
import Location from "./Location.js";

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }
});


const Event = mongoose.model("Event", EventSchema);
export default Event;
