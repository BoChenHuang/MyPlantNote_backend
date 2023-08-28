import express from "express";
import typeController from "../../../controller/type";
import { ensureToken } from "../../../middleware";

const router = express.Router();

router.get("/", typeController.getTypes);

//需登入的操作
router.post("/", ensureToken, typeController.createType);

export default router;
