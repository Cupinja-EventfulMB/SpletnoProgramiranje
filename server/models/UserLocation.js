import mongoose from "mongoose";
const { Schema } = mongoose;

const UserLocationSchema = new Schema({
    uuid: {
        type: String,
        required: true
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
    }
}, {
    timestamps: true
});

UserLocationSchema.index({ location: "2dsphere" });

const UserLocation = mongoose.model("UserLocation", UserLocationSchema);
export default UserLocation;
