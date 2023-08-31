import Article from "../models/article";
import { verifyToken } from "../service/utils";

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

const postArticle = async (req, res) => {
  const token = req.token;
  try {
    const decodeed = await verifyToken(token);
    const { title, pictures, plantType, content } = req.body;
    const articleData = new Article({
      title: title ? title : undefined,
      author: decodeed.payload.user_id,
      pictures: pictures ? pictures : [],
      plantType: plantType ? plantType : undefined,
      content: content ? content : "",
    });
    const newArticle = await articleData.save();
    res.status(200).json(newArticle);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateArticle = async (req, res) => {
  const token = req.token;
  const id = req.params.id;
  try {
    const decodeed = await verifyToken(token);
    const { title, pictures, plantType, content } = req.body;
    const data = {
      title: title ? title : undefined,
      author: decodeed.payload.user_id,
      pictures: pictures ? pictures : [],
      plantType: plantType ? plantType : undefined,
      content: content ? content : "",
      lastModifiedDate: Date.now(),
    };
    const queryParams = {
      _id: id,
      author: decodeed.payload.user_id,
    };
    const updatedArticle = await Article.findOneAndUpdate(queryParams, data, {
      returnDocument: "after",
    });
    res.status(200).json(updatedArticle);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteArticle = async (req, res) => {
  const token = req.token;
  const id = req.params.id;
  try {
    const decodeed = await verifyToken(token);
    const queryParams = {
      _id: id,
      author: decodeed.payload.user_id,
    };
    await Article.findOneAndDelete(queryParams);
    res.json({ message: "Delete article success" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getPersonalArticle = async (req, res) => {
    const token = req.token;
    const plantType = req.query.plantType;

    try {
      const decodeed = await verifyToken(token);
      const userId = decodeed.payload.user_id;
      const queryParams = {
        author: userId,
      };
      if (plantType) queryParams.plantType = plantType;

      const articles = await Article.find(queryParams).populate(['plantType', 'pictures']).exec();
      res.status(200).json(articles);
    } catch (err) {
      res.status(500).json(err);
    }
  };

export default { getArticle, postArticle, updateArticle, deleteArticle, getPersonalArticle };
