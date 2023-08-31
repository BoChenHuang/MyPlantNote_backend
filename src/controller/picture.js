import Picture from "../models/picture";
import Plant from "../models/plant";
import { verifyToken } from "../service/utils";

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

const addPictureToPlant = async (req, res) => {
  const id = req.params.id;
  const token = req.token;
  try {
    const decodeed = await verifyToken(token);
    const queryParams = {
      _id: id,
      owner: decodeed.payload.user_id,
    };
    const plant = await Plant.findOne(queryParams);
    if (!plant)
      res.status(404).json({ message: `Can't find plat by id: ${id}` });
    else {
      const uploadedFile = [];
      for (const pictureData of req.body.pictureList) {
        const data = new Picture({
          fileName: pictureData.fileName,
          fileSize: pictureData.fileSize,
          base64: pictureData.base64,
        });
        await data.save();
        uploadedFile.push(data);
        if (plant.pictures) plant.pictures.push(data._id);
        else plant.pictures = [data._id];
      }
      await plant.save();
      res.status(200).json(uploadedFile);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default { getPicture, addPictureToPlant };
