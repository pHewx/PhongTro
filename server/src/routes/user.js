import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as userController from "../controllers/user";

const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getCurrent);
router.get("/get-user/:id", userController.getUser);
router.patch("/update-current", userController.updateUser);

export default router;
