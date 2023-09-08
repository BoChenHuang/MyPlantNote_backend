import Picture from "../models/picture";
import Plant from "../models/plant";
import { verifyToken } from "../service/utils";
import {
  getEntityFromTarget,
  getAllConatainPictureEntities,
} from "../service/utils";

const getPicture = async (req, res) => {
  const id = req.query.id;
  let pictures;
  try {
    if (id) pictures = await Picture.findById(id);
    else pictures = await Picture.find();

    if (pictures != null) res.status(200).json(pictures);
    else res.status(404).json({ message: `Can't find picture by id: ${id}` });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const createPicture = async (req, res) => {
  const token = req.token;
  try {
    const uploadedFile = [];
    const decodeed = await verifyToken(token);
    for (const pictureData of req.body.pictureList) {
      const data = new Picture({
        owner: decodeed.payload.user_id,
        fileName: pictureData.fileName,
        fileSize: pictureData.fileSize,
        base64: pictureData.base64,
      });
      await data.save();
      uploadedFile.push(data);
    }
    res.status(200).json(uploadedFile);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const addPictureToTarget = async (req, res) => {
  const token = req.token;
  const targets = req.body.targets;
  const pictureIdList = req.body.pictureIdList;
  console.log(pictureIdList);

  try {
    const decodeed = await verifyToken(token);
    const userId = decodeed.payload.user_id;
    const entityList = [];
    // check target exist
    for (const target of targets) {
      const entity = await getEntityFromTarget(target, userId);
      if (entity) entityList.push(entity);
      else {
        res.status(404).json({ message: `Target: ${target} not found` });
        return;
      }
    }

    for (const entity of entityList) {
      for (const pictureId of pictureIdList) {
        if (entity.pictures.indexOf(pictureId) === -1)
          entity.pictures.push(pictureId);
      }
      await entity.save();
    }
    res.status(200).json(entityList);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deletePicture = async (req, res) => {
  const token = req.token;
  const pictureIdList = req.body.pictureIdList;

  try {
    const decodeed = await verifyToken(token);
    const userId = decodeed.payload.user_id;

    const entities = await getAllConatainPictureEntities(userId);
    for (const pictureId of pictureIdList) {
      for (const entity of entities) {
        const index = entity.pictures.indexOf(pictureId);
        if (index != -1) {
          entity.pictures.splice(index, 1);
          await entity.save();
        }
      }
      const picture = await Picture.findById(pictureId);
      if (picture != null) await picture.deleteOne();
    }
    res.status(200).json({message: "Delete success"});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default { getPicture, createPicture, addPictureToTarget, deletePicture };
