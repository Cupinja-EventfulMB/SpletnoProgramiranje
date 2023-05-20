import Location from "../models/Location.js";
import Event from "../models/Event.js";

export const getAll = async (req, res) => {
    try{
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOne = async (req, res) => {
    const { id } = req.params;
    try {
        const location = await Location.findById(id);
        res.status(200).json(location);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const create = async (req, res) => {
    const { institution, city, street } = req.body;
    const location = { institution, city, street };
    const newLocation = new Location(location);
    try {
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const update = async (req, res) => {
    const { id } = req.params;
    const { institution, city, street } = req.body;

    try {
        const location = await Location.findById(id);

        if (location) {
            location.institution = institution;
            location.city = city;
            location.street = street;

            await location.save();
            res.status(200).json(location);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await Location.findByIdAndDelete(id);
        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}