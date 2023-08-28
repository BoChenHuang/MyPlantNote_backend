import express from "express";
import config from "../../config/config";
import plantRouter from "./plant/plant.route";
import userRouter from "./user/user.route";
import typeRouter from "./type/type.route";

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

export default router;
