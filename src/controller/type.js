import Type from "../models/type";
import { verifyToken } from "../service/utils";

const getTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createType = async (req, res) => {
  const token = req.token;
  const name = req.body.name;

  try {
    const decodeed = await verifyToken(token);
    const userId = decodeed.payload.user_id;
    const typeData = new Type({ name: name, owner: userId });
    const newType = await typeData.save();
    res.status(200).json(newType);
  } catch (err) {
    res.status(500).send(err);
  }
};

export default { getTypes, createType };
