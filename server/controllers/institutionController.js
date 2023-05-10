import Institution from '../models/Institution.js';

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
        const institution = await Institution.findById(id);
        res.status(200).json(institution);
    }
    catch (error) {
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