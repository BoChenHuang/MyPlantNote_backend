import Note from "../models/note";
import Plant from "../models/plant";
import { verifyToken } from "../service/utils";

const getNotes = async (req, res) => {
  const id = req.query.id;
  let notes;
  try {
    if (id) notes = await Note.findById(id);
    else notes = await Note.find();

    if (notes != null) res.status(200).json(notes);
    else res.status(404).json({ message: `Can't find note by id: ${id}` });
  } catch (err) {
    res.status(500).send(err);
  }
};

const postNote = async (req, res) => {
  const token = req.token;
  const plantId = req.params.plantId;
  try {
    const decodeed = await verifyToken(token);
    const queryParams = {
      _id: plantId,
      owner: decodeed.payload.user_id,
    };
    const plant = await Plant.findOne(queryParams);
    if (!plant)
      res.status(404).json({ message: `Can't find plant by id: ${plantId}` });
    else {
      const noteDate = new Note({
        plantId: plantId,
        author: decodeed.payload.user_id,
        title: req.body.title ? req.body.title : undefined,
        pictures: req.body.pictures ? req.body.pictures : [],
        content: req.body.content ? req.body.content : "",
      });
      const newNote = await noteDate.save();
      await newNote.populate("pictures");
      plant.notes.push(newNote._id);
      plant.isNew = false;
      await plant.save();
      res.status(200).json({ note: newNote, plant: plant._id });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateNote = async (req, res) => {
  const token = req.token;
  const id = req.params.id;
  try {
    const decodeed = await verifyToken(token);
    const queryParams = {
      _id: id,
      author: decodeed.payload.user_id,
    };
    const data = {
      title: req.body.title ? req.body.title : undefined,
      pictures: req.body.pictures ? req.body.pictures : undefined,
      content: req.body.content ? req.body.content : undefined,
    };
    const updateNote = await Note.findOneAndUpdate(queryParams, data, {
      returnDocument: "after",
    });
    res.status(200).json(updateNote);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteNote = async (req, res) => {
  const token = req.token;
  const id = req.params.id;
  try {
    const decodeed = await verifyToken(token);
    const queryParams = {
      _id: id,
      author: decodeed.payload.user_id,
    };
    // 欲刪除的 note
    const note = await Note.findOne(queryParams);
    if (note == null)
      res.status(404).json({ message: `Can not find note by id: ${id}` });
    else {
      // 移除 plant 中的紀錄
      const plant = await Plant.findOne({
        _id: note.plantId,
        owner: decodeed.payload.user_id,
      });
      const index = plant.notes.indexOf(id);
      if (index !== -1) plant.notes.splice(index, 1);
      await note.deleteOne();
      await plant.save();
      res.status(200).json({message: "Delete note sucess"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default { getNotes, postNote, updateNote, deleteNote };
