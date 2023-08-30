import Note from "../models/note";

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

export default { getNotes };
