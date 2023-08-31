import express from "express";
import plantController from "../../../controller/plant";
import { ensureToken } from "../../../middleware";
import paramsValidator from "../../../config/params-validator";
import { validate, ValidationError } from "express-validation";

const router = express.Router();

// for admin
router.get("/", validate(paramsValidator.getPlant), plantController.getPlants);
// router.get("/:id", plantController.getPlanById);

//需登入的操作
router.post("/",validate(paramsValidator.createPlant) ,ensureToken, plantController.addPlant);
router.delete("/:id", validate(paramsValidator.deletePlant),ensureToken, plantController.deletePlant);
router.patch("/:id", validate(paramsValidator.updatePlant) ,ensureToken, plantController.updatePlant);
router.get("/personal", ensureToken, plantController.getPersonalPlant);

router.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

export default router;
