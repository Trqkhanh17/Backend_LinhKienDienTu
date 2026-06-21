import { Request, Response } from "express";
import staffService from "../services/staffService";
import { sendServiceResponse } from "../utils/controllerResponse";

export const getAllStaff = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await staffService.getAllStaff());
  } catch (error) {
    console.log("Get all staff error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const updateStaffProfile = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await staffService.updateStaffProfile(req.body));
  } catch (error) {
    console.log("Update Profile Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const findStaff = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await staffService.findStaff(req.body.inforFind));
  } catch (error) {
    console.log("Find staff error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getStaffById = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await staffService.getStaffById(req.params.staffId || req.body.staffId)
    );
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
