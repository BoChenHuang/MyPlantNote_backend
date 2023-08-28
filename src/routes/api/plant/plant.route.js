import express from "express";
import plantController from "../../../controller/plant";
import { ensureToken } from "../../../middleware";

const router = express.Router();

// for admin
router.get("/", plantController.getPlants);
// router.get("/:id", plantController.getPlanById);

//需登入的操作
router.post("/", ensureToken, plantController.addPlant);
router.delete("/:id", ensureToken, plantController.deletePlant);
router.patch("/:id", ensureToken, plantController.updatePlant);
router.get('/personal', ensureToken, plantController.getPersonalPlant);

export default router;
