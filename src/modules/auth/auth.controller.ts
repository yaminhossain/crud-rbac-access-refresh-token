import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { id, name, role_id } = req.body;
    const result = await authServices.logInUserIntoDB({ id, name, role_id });

    res.status(200).send({
      success: true,
      message: "User Logged In Successfully",
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

export const authController = { loginUser };
