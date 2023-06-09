import Institution from '../models/Institution.js';
import Event from '../models/Event.js';

export const getAll = async (req, res) => {
    try {
        const institutions = await Institution.find();
        res.json(institutions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllNearby = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const events = await Institution.find({
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
      const institution = await Institution.findById(id).populate('location');
      res.status(200).json(institution);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export const create = async (req, res) => {
    const {name, email, phoneNumber, address, location, mainImage, images, description} = req.body;
    const newInstitution = new Institution({name, email, phoneNumber, address, location, mainImage, images, description});
    try {
        await newInstitution.save();
        res.status(201).json(newInstitution);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const update = async (req, res) => {
    const { id } = req.params;
    const {name, email, phoneNumber, address, location, mainImage, images, description} = req.body;
    try {
        const institution = await Institution.findById(id);
        if(institution){
            institution.name = name;
            institution.email = email;
            institution.phoneNumber = phoneNumber;
            institution.address = address;
            institution.location = location;
            institution.mainImage = mainImage;
            institution.images = images;
            institution.description = description;
            await institution.save();
            res.status(200).json(institution);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getInstitutionEvents = async (req, res) => {
    try {
      const institutionId = req.params.id; // Assuming the institution ID is passed as a parameter
  
      // Find the institution by its ID and populate the "location" field
      const institution = await Institution.findById(institutionId).populate("location");
  
      if (!institution) {
        return res.status(404).json({ message: "Institution not found" });
      }
  
      // Find events where the institution's location matches the event's location
      const events = await Event.find({ "location": institution.location }).populate("location");
  
      const localizedEvents = [];
      for (const event of events) {
        if (event.location.toString() === institution.location.toString()) {
          const localizedDate = event.date.toLocaleString();
          const localizedEvent = { ...event._doc, date: localizedDate };
          localizedEvents.push(localizedEvent);
        }
      }
  
      res.status(200).json(localizedEvents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  
  
  

export const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await Institution.findByIdAndDelete(id);
        res.status(200).json({ message: "Institution deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}