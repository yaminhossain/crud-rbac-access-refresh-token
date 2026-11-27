import { Router } from "express";
import { userController } from "./user.controller";

const router: Router = Router();

router.post("/", userController.createUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
