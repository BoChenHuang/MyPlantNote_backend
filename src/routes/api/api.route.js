import express from "express";
import config from "../../config/config";
import plantRouter from "./plant/plant.route";
import userRouter from "./user/user.route";
import typeRouter from "./type/type.route";
import noteRouter from "./note/note.route";
import articleRouter from "./article/article.route";
import pictureRouter from "./picture/picture.route";

const router = express.Router();

router.use(
  "/plant",
  (req, res, next) => {
    // #swagger.tags = ['Plant']
    next();
  },
  plantRouter
);
router.use(
  "/user",
  (req, res, next) => {
    // #swagger.tags = ['User']
    next();
  },
  userRouter
);
router.use(
  "/type",
  (req, res, next) => {
    // #swagger.tags = ['Type']
    next();
  },
  typeRouter
);

router.use(
  "/note",
  (req, res, next) => {
    // #swagger.tags = ['Note']
    next();
  },
  noteRouter
);

router.use(
  "/article",
  (req, res, next) => {
    // #swagger.tags = ['Article']
    next();
  },
  articleRouter
);

router.use(
  "/picture",
  (req, res, next) => {
    // #swagger.tags = ['Picture']
    next();
  },
  pictureRouter
);

export default router;
