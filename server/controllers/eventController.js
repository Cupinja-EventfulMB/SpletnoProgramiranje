import Event from "../models/Event.js";
import User from "../models/User.js";
import Location from "../models/Location.js";


export const getAll = async (req, res) => {
    try {
        const events = await Event.find().populate('location');
        const localizedEvents = events.map(event => {
            const localizedDate = event.date.toLocaleString();
            return {...event._doc, date: localizedDate};
        });
        res.status(200).json(localizedEvents);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};


export const getAllNearby = async (req, res) => {
    try {
        const {latitude, longitude} = req.query;
        const events = await Event.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 100,
                },
            },
        }).exec();
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const getOne = async (req, res) => {
    const {id} = req.params;
    try {
        const event = await Event.findById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const create = async (req, res) => {
    const {
        image,
        title,
        date,
        location,
        description,
        category,
        going,
        interested,
    } = req.body;
    const event = {
        image,
        title,
        date,
        location,
        description,
        category,
        going,
        interested,
    };
    console.log(event);
    const newEvent = new Event(event);
    try {
        let location = await Location.findOne({institution: event.location.institution})
        if (location == null) {
            location = await Location.create(event.location)
        }
        event.location = location._id
        const newEvent = await Event.create(event);
        res.status(201).json(newEvent);
    } catch (error) {
        console.log(error)
        res.status(409).json({message: error.message});
    }
};

export const update = async (req, res) => {
    const {id} = req.params;
    const {
        imgUrl,
        title,
        date,
        location,
        description,
        category,
        going,
        interested,
    } = req.body;

    try {
        const event = await Event.findById(id);

        if (event) {
            event.imgUrl = imgUrl;
            event.title = title;
            event.date = date;
            event.location = location;
            event.description = description;
            event.category = category;
            event.going = going;
            event.interested = interested;
            event.duration = duration;

            await event.save();
            res.status(200).json(event);
        } else {
            res.status(404).json({message: "Event not found"});
        }
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export const remove = async (req, res) => {
    const {id} = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.status(200).json({message: "Event deleted successfully"});
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export const going = async (req, res) => {
    const {userId, eventId} = req.body;
    console.log(userId, eventId);
    try {
        const event = await Event.findById(eventId);
        if (event) {
            event.going.push(userId);
            await event.save();

            const user = await User.findById(userId);
            user.going.push(eventId);
            await user.save();
            res.status(200).json(event);
        } else {
            res.status(404).json({message: "Event not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(409).json({message: error.message});
    }
};

export const notGoing = async (req, res) => {
    const {userId, eventId} = req.body;
    try {
        const event = await Event.findById(eventId);
        if (event) {
            event.going = event.going.filter((id) => id !== userId);
            await event.save();

            const user = await User.findById(userId);
            user.going.filter((id) => id !== eventId);
            await user.save();
            res.status(200).json(event);
        } else {
            res.status(404).json({message: "Event not found"});
        }
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export const interested = async (req, res) => {
    const {userId, eventId} = req.body;
    try {
        const event = await Event.findById(eventId);
        if (event) {
            event.interested.push(userId);
            await event.save();

            const user = await User.findById(userId);
            user.interested.push(eventId);
            await user.save();
            res.status(200).json(event);
        } else {
            res.status(404).json({message: "Event not found"});
        }
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export const notInterested = async (req, res) => {
    const {userId, eventId} = req.body;
    try {
        const event = await Event.findById(eventId);
        if (event) {
            event.interested = event.interested.filter((id) => id !== userId);
            await event.save();

            const user = await User.findById(userId);
            user.interested.filter((id) => id !== eventId);
            await user.save();
            res.status(200).json(event);
        } else {
            res.status(404).json({message: "Event not found"});
        }
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};
