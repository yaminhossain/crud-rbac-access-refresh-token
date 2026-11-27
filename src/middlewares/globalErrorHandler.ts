import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = err instanceof Error ? err.message : "Something went wrong";

  res.status(500).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;
