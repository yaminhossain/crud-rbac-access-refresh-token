import { Router } from "express";
import { userController } from "./user.controller";

const router: Router = Router();

router.post("/", userController.createUser);

export const userRouter = router;
