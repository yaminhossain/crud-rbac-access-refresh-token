import express, { Application, Request, Response } from "express";

const app: Application = express();
app.use(express.json());

// server init
app.get("/", (req: Request, res: Response) => {
  res.send("Let's do some blogging");
});

export default app;
