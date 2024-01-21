import Sensor from '../models/Sensor.js'; 
import { publishToLutkovno, publishToSNG } from '../app.js';

export const getOne = async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ sensor: 'Message not found' });
    }
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ sensor: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const sensors = await Sensor.find({});
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ sensor: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const newSensor = new Sensor(req.body);
    const savedSensor = await newSensor.save();

    if (newSensor.value >= 100 && (newSensor.location.address === ('Slovensko narodno gledalisce Maribor' || 'Slovensko narodno gledalisce Maribor ')) && newSensor.category === 'People') {
      publishToSNG("More than 100 people spotted at SNG");
    } else if (newSensor.value >= 100 && (newSensor.location.address === ('Lutkovno gledalisce Maribor' || 'Lutkovno gledalisce Maribor ')) && newSensor.category === 'People') {
      publishToLutkovno("More than 100 people spotted at Lutkovno");
    }

    res.status(201).json(savedSensor);
  } catch (error) {
    res.status(400).json({ sensor: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ sensor: 'Message not found' });
    }
    await sensor.remove();
    res.json({ sensor: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ sensor: error.message });
  }
};