import { Response } from "express";

export default class ResponseHandler {
  public static response(res: Response, code: number, message: string | null, data: Record<string, any> | [] | null) {
    const response = {
      status: "SUCCESS",
      message,
      data,
    };
    res.status(code).send(response);
  }
}
