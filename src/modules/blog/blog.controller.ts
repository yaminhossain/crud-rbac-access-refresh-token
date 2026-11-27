import { Request, Response } from "express";
import { blogServices } from "./blog.service";
const createBlog = async (req: Request, res: Response) => {
  try {
    const result = await blogServices.createBlogIntoDB(req.body);
    if (!result) {
      res.send(500).send({
        success: false,
        message: "User Creation was unsuccessful",
      });
      return;
    }

    res.status(201).send({
      success: true,
      message: "Blog Create Successfully",
      data: result,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something Went Wrong";
    res.status(500).send({
      success: false,
      message,
      error: err,
    });
  }
};

export const blogControllers = {
  createBlog,
};
