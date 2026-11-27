import { Router } from "express";
import { blogControllers } from "./blog.controller";

const router = Router();

router.post("/", blogControllers.createBlog);
router.get("/:id", blogControllers.getBlog);
router.get("/", blogControllers.getAllBlog);

export const blogRouter = router;
