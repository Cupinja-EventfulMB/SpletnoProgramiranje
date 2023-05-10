import Notification from '../models/Notification.js';

export const getAll = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOne = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findById(id);
        res.status(200).json(notification);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const create = async (req, res) => {
    const {  } = req.body;
    const notification = { text, event, date, type };
    const newNotification = new Notification(notification);
    try {
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const update = async (req, res) => {
    const { id } = req.params;
    const { text, event, date, type } = req.body;

    try {
        const notification = await Notification.findById(id);

        if (notification) {
            notification.text = text;
            notification.event = event;
            notification.date = date;
            notification.type = type;

            await notification.save();
            res.status(200).json(notification);
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
        await Notification.findByIdAndDelete(id);
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}