import express from "express";
import pictureController from "../../../controller/picture";
import { ensureToken } from "../../../middleware";

const router = express.Router();

// for admin
router.get("/", pictureController.getPicture);
// router.get("/:id", plantController.getPlanById);

//TODO 需登入的操作

export default router;
