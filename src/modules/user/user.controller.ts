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

export const userController = { createUser };
