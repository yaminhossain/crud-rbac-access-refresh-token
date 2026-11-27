import express, { Application, Request, Response } from "express";
import { authRouter } from "./modules/auth/auth.route";
import { userRouter } from "./modules/user/user.route";
import { blogRouter } from "./modules/blog/blog.route";

const app: Application = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

// server init
app.get("/", (req: Request, res: Response) => {
  res.send("Let's do some blogging");
});

export default app;
