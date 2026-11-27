import { Request, Response } from "express";

const loginUser = async (req: Request, res: Response) => {
  try {
    res.status(200).send({
      success: true,
      message: "User Logged In Successfully",
      data: {},
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
