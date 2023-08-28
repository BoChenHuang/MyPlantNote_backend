import express from "express";
import userController from "../../../controller/user";
import { ensureToken } from "../../../middleware";

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.post("/login", userController.login);

//需登入的操作
router.patch("/update", ensureToken, userController.updateUser);

export default router;
