import { Request, Response } from "express";
import accountService from "../services/accountService";
import { sendServiceResponse } from "../utils/controllerResponse";

export const getAllAccount = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await accountService.getAllAccount());
  } catch (error) {
    console.log("Get all account error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await accountService.changePassword(req.body));
  } catch (error) {
    console.log("Change Password Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const banndedCustomer = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await accountService.banndedCustomer(req.body.acc_email)
    );
  } catch (error) {
    console.log("Banned Account Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const unBannedCustomer = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await accountService.unBannedCustomer(req.body.acc_email)
    );
  } catch (error) {
    console.log("Unbanned Account Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const findAccount = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await accountService.findAccount(req.body.acc_email)
    );
  } catch (error) {
    console.log("Find Account Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getProfileAccountByEmail = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await accountService.getProfileAccountByEmail(req.body.acc_email)
    );
  } catch (error) {
    console.log("Get Profile Account Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};
