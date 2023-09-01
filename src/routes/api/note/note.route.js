import express from "express";
import noteController from "../../../controller/note";
import { ensureToken } from "../../../middleware";
import paramsValidator from "../../../config/params-validator";
import { validate, ValidationError } from "express-validation";

const router = express.Router();

// for admin
router.get("/", validate(paramsValidator.getNote), noteController.getNotes);

// 需登入的操作
router.post("/:plantId", validate(paramsValidator.createNote), ensureToken, noteController.postNote);
router.patch("/:id", validate(paramsValidator.updateNote), ensureToken, noteController.updateNote);
router.delete("/:id", validate(paramsValidator.deleteNote), ensureToken, noteController.deleteNote);

router.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
});

export default router;
