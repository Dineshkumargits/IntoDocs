import { Response } from "express";
export default class ErrorHandler {
  public static response(res: Response, code: number, message: string, data: Record<string, any> | [] | null) {
    const retrn = {
      status: "ERROR",
      message,
      data,
    };
    res.status(code).send(retrn);
    return retrn;
  }
}
