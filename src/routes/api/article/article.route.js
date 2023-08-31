import express from "express";
import articleController from "../../../controller/article";
import { ensureToken } from "../../../middleware";

const router = express.Router();

// for admin
router.get("/", articleController.getArticle);

// 需登入的操作
router.post("/", ensureToken, articleController.postArticle);
router.patch("/:id", ensureToken, articleController.updateArticle);
router.delete("/:id", ensureToken, articleController.deleteArticle);
router.get('/personal', ensureToken, articleController.getPersonalArticle);


export default router;
