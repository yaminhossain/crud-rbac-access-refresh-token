import { Request, Response } from "express";
import { blogServices } from "./blog.service";
import { validStingID } from "../../utils/helper";
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

const getBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).send({
        success: false,
        message: "Invalid User ID",
      });
      return;
    }
    const result = await blogServices.getBlogFromDB(id);
    res.status(200).send({
      success: true,
      message: "Blog retrieved successfully",
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

const getAllBlog = async (req: Request, res: Response) => {
  try {
    const result = await blogServices.getAllBlogsFromDB();
    res.status(200).send({
      success: true,
      message: "Blogs Retrieved Successfully",
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

const updateBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!validStingID(id)) {
      res.status(500).send({
        success: false,
        message: "Invalid User ID",
      });
      return;
    }
    
    const { title, sub_title, content, topic_id } = req.body;
    const result = await blogServices.updateBlogIntoDB({
      id,
      title,
      sub_title,
      content,
      topic_id,
    });
    res.status(200).send({
      success: true,
      message: "Blog Updated Successfully",
      data: result,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Something Went Wrong";
    res.status(500).send({
      success: false,
      message,
      error: e,
    });
  }
};

export const blogControllers = {
  createBlog,
  getBlog,
  getAllBlog,
  updateBlog,
};
