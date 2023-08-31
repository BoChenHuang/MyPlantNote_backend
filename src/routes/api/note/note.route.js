import express from "express";
import noteController from "../../../controller/note";
import { ensureToken } from "../../../middleware";

const router = express.Router();

// for admin
router.get("/", noteController.getNotes);

//TODO 需登入的操作
router.post("/:plantId", ensureToken, noteController.postNote);
router.patch("/:id", ensureToken, noteController.updateNote);
router.delete("/:id", ensureToken, noteController.deleteNote);

export default router;
