import { Response } from "express";
import { ServiceResponse } from "../types/serviceResponse";

export const sendServiceResponse = <T>(
  res: Response,
  result: ServiceResponse<T>
) => {
  const { httpStatus, ...body } = result;
  return res.status(httpStatus ?? 200).json(body);
};
