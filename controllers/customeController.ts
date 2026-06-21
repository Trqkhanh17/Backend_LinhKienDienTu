import { Request, Response } from "express";
import customerService from "../services/customerService";
import { sendServiceResponse } from "../utils/controllerResponse";

export const getAllCustomer = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await customerService.getAllCustomer());
  } catch (error) {
    console.log("Get all customer error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await customerService.updateCustomer(req.body));
  } catch (error) {
    console.log("Banned Account Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const findCustomer = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await customerService.findCustomer(String(req.query.inforFind))
    );
  } catch (error) {
    console.log("Find Customer Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getProfileCustomerByEmail = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await customerService.getProfileCustomerByEmail(req.header("Authorization"))
    );
  } catch (error) {
    console.log("Get Profile Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};
