import mongoose from "mongoose";
const { Schema } = mongoose;

const SensorSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number], 
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    time: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, { timestamps: true });

SensorSchema.index({ location: "2dsphere" });

const Sensor = mongoose.model("Sensor", SensorSchema);
export default Sensor;
