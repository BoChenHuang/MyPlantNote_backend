import express from "express";
import userController from "../../../controller/user";
import { ensureToken } from "../../../middleware";
import paramsValidator from "../../../config/params-validator";
import { validate, ValidationError } from "express-validation";

const router = express.Router();

router.get("/", validate(paramsValidator.getUser), userController.getUsers);
router.post("/", validate(paramsValidator.createUser), userController.createUser);
router.post("/login", validate(paramsValidator.userLogin), userController.login);

//需登入的操作
router.patch("/update", validate(paramsValidator.updateUser), ensureToken, userController.updateUser);

router.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

export default router;
