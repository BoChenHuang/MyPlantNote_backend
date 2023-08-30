import express from "express";
import noteController from "../../../controller/note";
import { ensureToken } from "../../../middleware";

const router = express.Router();

// for admin
router.get("/", noteController.getNotes);
// router.get("/:id", plantController.getPlanById);

//TODO 需登入的操作

export default router;
