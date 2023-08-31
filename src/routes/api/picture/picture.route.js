import express from "express";
import pictureController from "../../../controller/picture";
import { ensureToken } from "../../../middleware";

const router = express.Router();

// for admin
router.get("/", pictureController.getPicture);

// 需登入的操作
router.post("plant/:id",ensureToken, pictureController.addPictureToPlant);

export default router;
