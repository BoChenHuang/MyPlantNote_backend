import jwt from "jsonwebtoken";
import config from "../config/config";
import Plant from "../models/plant";
import Note from "../models/note";
import Article from "../models/article";

export const verifyToken = async (token) => {
  if (!token) return {};
  return new Promise((resolve, reject) =>
    jwt.verify(token, config.secret, (err, decoded) =>
      err ? reject(err) : resolve(decoded)
    )
  );
};

export const getEntityFromTarget = async (target, userId) => {
  switch (target.type) {
    case "plant":
      const plant = await Plant.findOne({ _id: target.id, owner: userId });
      return plant;
      break;
    case "note":
      const note = await Note.findOne({ _id: target.id, author: userId });
      return note;
      break;
    case "article":
      const article = await Article.findOne({ _id: target.id, author: userId });
      return article;
      break;
    default:
      return null;
      break;
  }
};

export const getAllConatainPictureEntities = async ( userId ) => {
  const plants = await Plant.find({owner: userId});
  const notes = await Note.find({author: userId});
  const articles = await Article.find({author: userId});

  return [...plants, ...notes, ...articles];
}