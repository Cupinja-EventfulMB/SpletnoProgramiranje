import Event from '../models/Event.js';

export const getAll = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllNearby = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
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
        res.status(404).json({ message: error.message });
    }
};

export const getOne = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
}

export const create = async (req, res) => {
    const { name, institution, location, images, description, category, going, interested, duration, date } = req.body;
    const event = { name, institution, location, images, description, category, going, interested, duration, date };
    const newEvent = new Event(event);
    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const update = async (req, res) => {
    const { id } = req.params;
    const { name, institution, location, images, description, category, going, interested, duration, date } = req.body;

    try {
        const event = await Event.findById(id);

        if (event) {
            event.name = name;
            event.institution = institution;
            event.location = location;
            event.images = images;
            event.description = description;
            event.category = category;
            event.going = going;
            event.interested = interested;
            event.duration = duration;
            event.date = date;

            await event.save();
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


export const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
