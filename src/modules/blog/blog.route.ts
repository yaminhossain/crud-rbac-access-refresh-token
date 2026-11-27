import { Router } from "express";
import { blogControllers } from "./blog.controller";

const router = Router();

router.post("/", blogControllers.createBlog);
router.get("/:id", blogControllers.getBlog);
router.get("/", blogControllers.getAllBlog);
router.patch("/:id", blogControllers.updateBlog);
router.delete("/:id", blogControllers.deleteBlog);

export const blogRouter = router;
