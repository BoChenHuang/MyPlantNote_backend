import Plant from "../models/plant";
import { verifyToken } from "../service/utils";

const getPlants = async (req, res) => {
  const id = req.query.id;
  let plants;
  try {
    if (id) plants = await Plant.findById(id);
    else plants = await Plant.find();

    if (plants != null) res.status(200).json(plants);
    else res.status(404).json({ message: `Can't find plant by id: ${id}` });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getPlanById = async (req, res) => {
  const id = req.params.id;
  try {
    const plant = await Plant.findById(id);
    if (plant) res.status(200).json(plant);
    else res.status(404).json({ message: `Can't find plant by id: ${id}` });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getPersonalPlant = async (req, res) => {
  const token = req.token;
  const type = req.query.type;

  try {
    const decodeed = await verifyToken(token);
    const userId = decodeed.payload.user_id;
    const queryParams = {
      owner: userId,
    };
    if (type) queryParams.type = type;

    const plants = await Plant.find(queryParams).populate(['type', 'notes', 'pictures']).exec();
    res.status(200).json(plants);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addPlant = async (req, res) => {
  const token = req.token;
  try {
    const decodeed = await verifyToken(token);
    const { name, type, startDate, lastWateringDate, wateringPeriod } =
      req.body;
    const plantData = new Plant({
      name: name ? name : undefined,
      type: type ? type : undefined,
      owner: decodeed.payload.user_id,
      startDate: startDate ? startDate : undefined,
      lastWateringDate: lastWateringDate ? lastWateringDate : undefined,
      wateringPeriod: wateringPeriod ? wateringPeriod : undefined,
    });
    const newPlant = await plantData.save();
    res.status(200).json(newPlant);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deletePlant = async (req, res) => {
  const id = req.params.id;
  const token = req.token;

  try {
    const decodeed = await verifyToken(token);
    const queryParams = {
      _id: id,
      owner: decodeed.payload.user_id,
    };
    await Plant.findOneAndDelete(queryParams);
    res.json({ message: "Delete plant success" });
  } catch (err) {
    res.status(500).send(err);
  }
};

const updatePlant = async (req, res) => {
  const token = req.token;
  const id = req.params.id;
  const data = {
    name: req.body.name ? req.body.name : undefined,
    type: req.body.type ? req.body.type : undefined,
    startDate: req.body.startDate ? req.body.startDate : undefined,
    lastWateringDate: req.body.lastWateringDate ? req.body.lastWateringDate : undefined,
    wateringPeriod: req.body.wateringPeriod ? req.body.wateringPeriod: undefined,
    lastModifiedDate: Date.now(),
  };
  try {
    const decodeed = await verifyToken(token);
    const queryParams = {
      _id: id,
      owner: decodeed.payload.user_id,
    };
    const updatedPlant = await Plant.findOneAndUpdate(queryParams, data, {
      returnDocument: "after",
    });
    res.status(200).json(updatedPlant);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default {
  getPlants,
  addPlant,
  deletePlant,
  getPlanById,
  updatePlant,
  getPersonalPlant,
};
