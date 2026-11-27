import express, { Application, NextFunction, Request, Response } from "express";
import { authRouter } from "./modules/auth/auth.route";
import { userRouter } from "./modules/user/user.route";
import { blogRouter } from "./modules/blog/blog.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();
app.use(express.json());

// server init
app.get("/", (req: Request, res: Response) => {
  res.send("Let's do some blogging");
});

// routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
