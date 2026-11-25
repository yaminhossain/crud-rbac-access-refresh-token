import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Blog Router");
});

export const blogRouter = router;
