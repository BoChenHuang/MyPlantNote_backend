import Article from "../models/article";

const getArticle = async (req, res) => {
  const id = req.query.id;
  let articles;
  try {
    if (id) articles = await Article.findById(id);
    else articles = await Article.find();

    if (articles != null) res.status(200).json(articles);
    else res.status(404).json({ message: `Can't find article by id: ${id}` });
  } catch (err) {
    res.status(500).send(err);
  }
};

export default { getArticle };
