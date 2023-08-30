import Picture from "../models/picture";

const getPicture = async (req, res) => {
  const id = req.query.id;
  let pictures;
  try {
    if (id) pictures = await Picture.findById(id);
    else pictures = await Picture.find();

    if (pictures != null) res.status(200).json(pictures);
    else res.status(404).json({ message: `Can't find picture by id: ${id}` });
  } catch (err) {
    res.status(500).send(err);
  }
};

export default { getPicture };
