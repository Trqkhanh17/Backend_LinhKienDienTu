import { Request, Response } from "express";
import authService from "../services/authService";
import { sendServiceResponse } from "../utils/controllerResponse";

const setAuthCookie = (res: Response, token?: string) => {
  if (!token) {
    return;
  }

  res.cookie("token", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
  });
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body.acc_email, req.body.password);
    setAuthCookie(res, result.token);
    return sendServiceResponse(res, result);
  } catch (error) {
    console.log("Get Staff Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

const signUpCustomer = async (req: Request, res: Response) => {
  try {
    const result = await authService.signUpCustomer(req.body);
    setAuthCookie(res, result.token);
    return sendServiceResponse(res, result);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

const signUpStaff = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await authService.signUpStaff(req.body));
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await authService.getProfile(req.headers.authorization)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

export default {
  getProfile,
  login,
  signUpCustomer,
  signUpStaff,
};
