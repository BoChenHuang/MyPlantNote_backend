import express from "express";
import articleController from "../../../controller/article";
import { ensureToken } from "../../../middleware";

const router = express.Router();

// for admin
router.get("/", articleController.getArticle);
// router.get("/:id", plantController.getPlanById);

//TODO 需登入的操作

export default router;
