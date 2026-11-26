import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUserIntoDB(req.body);
    res.status(200).send({
      success: true,
      message: "user created successfully",
      data: result,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Something went wrong";
    res.status(500).send({
      success: false,
      message,
      error: e,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    let result;
    if (req.params.id && typeof req.params.id === "string") {
      const id = req.params.id;
      result = await userServices.getUserFromDB(id);
    } else {
      res.status(400).send({
        success: false,
        message: "Invalid user id",
      });
    }

    if (!result) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(500).send({ success: false, message, error: err });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();
    if (!result) {
      res.status(404).send({
        success: false,
        message: "No user found",
        data: [],
      });
    }
    res.status(200).send({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(500).send({
      success: false,
      message,
      error: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.updateUserIntoDB({
      ...req.body,
      id: req.params.id,
    });

    res.status(200).send({
      success: true,
      message: "User Data Updated Successfully",
      data: result,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(500).send({
      success: false,
      message,
      error: err,
    });
  }
};

export const userController = { createUser, getUser, getAllUser, updateUser };
