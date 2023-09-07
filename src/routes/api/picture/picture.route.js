import express from "express";
import pictureController from "../../../controller/picture";
import { ensureToken } from "../../../middleware";
import { validate, ValidationError } from "express-validation";
import paramsValidator from "../../../config/params-validator";

const router = express.Router();

// for admin
router.get("/",validate(paramsValidator.getPicture), pictureController.getPicture);

// 需登入的操作
router.post("/", validate(paramsValidator.createPicture),ensureToken, pictureController.createPicture);
router.post("/add", validate(paramsValidator.addPictureToTarget), ensureToken, pictureController.addPictureToTarget);
router.delete("/", validate(paramsValidator.deletePicture),ensureToken, pictureController.deletePicture);


router.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
  });

export default router;
