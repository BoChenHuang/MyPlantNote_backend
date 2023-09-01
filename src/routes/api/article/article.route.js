import express from "express";
import articleController from "../../../controller/article";
import { ensureToken } from "../../../middleware";
import paramsValidator from "../../../config/params-validator";
import { validate, ValidationError } from "express-validation";

const router = express.Router();

// for admin
router.get("/", validate(paramsValidator.getArticle),articleController.getArticle);

// 需登入的操作
router.post("/", validate(paramsValidator.createArticle),ensureToken, articleController.postArticle);
router.patch("/:id", validate(paramsValidator.updateArticle), ensureToken, articleController.updateArticle);
router.delete("/:id", validate(paramsValidator.deleteArticle), ensureToken, articleController.deleteArticle);
router.get("/personal", validate(paramsValidator.getPersonalArticle), ensureToken, articleController.getPersonalArticle);

router.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

export default router;
