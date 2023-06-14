import Event from "../models/Event.js";
import User from "../models/User.js";
import Location from "../models/Location.js";

export const getAll = async (req, res) => {
  try {
    const events = await Event.find().populate("location");
    const localizedEvents = events.map((event) => {
      const localizedDate = event.date.toLocaleString();
      return { ...event._doc, date: localizedDate };
    });
    res.status(200).json(localizedEvents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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
    let location = await Location.findOne({
      institution: event.location.institution,
    });
    if (location == null) {
      location = await Location.create(event.location);
    }
    event.location = location._id;
    const newEvent = await Event.create(event);
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
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
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const going = async (req, res) => {
  const { userId, eventId } = req.body;
  const event = await Event.findById(eventId);
  const user = await User.findById(userId);
  console.log(user.events.going, event._id);
  if (!user || !event) res.status(404).json({ message: "Invalid request" });
  try {
    if (user.events.going.includes(event._id)) {
      user.events.going = user.events.going.filter((id) => {
        return id == event._id;
      });
      event.going = event.going.filter((id) => {
        return id == user._id;
      });
    } else {
      event.going.push(user._id);
      user.events.going.push(event._id);
    }
    event.save();
    user.save();
    res.status(200).json({ message: "Success!" });
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const interested = async (req, res) => {
  const { userId, eventId } = req.body;
  const event = Event.findById(eventId);
  const user = User.findById(userId);
  if (!user || !event) res.status(404).json({ message: "Invalid request" });
  try {
    if (user.events.interested.includes(event._id)) {
      user.events.interested = user.events.interested.filter(event._id);
      event.interested = event.interested.filter(user._id);
    } else {
      event.interested.push(user._id);
      user.events.interested.push(event._id);
    }
    event.save();
    user.save();
    res.status(200).json({ message: "Success!" });
  } catch (err) {
    console.log(err.message);
    res.status(409).json({ message: err.message });
  }
};
