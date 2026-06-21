import { Request, Response } from "express";
import analytisService from "../services/analytisService";
import { sendServiceResponse } from "../utils/controllerResponse";

export const getOverallStats = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await analytisService.getOverallStats());
  } catch (error) {
    console.log("Lỗi thống kê tổng quan: ", error);
    return res.status(500).json("Lỗi máy chủ nội bộ");
  }
};

export const getDailyStats = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await analytisService.getDailyStats(req.body.date)
    );
  } catch (error) {
    console.log("Lỗi thống kê theo ngày: ", error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export const getMonthlyStats = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await analytisService.getMonthlyStats());
  } catch (error) {
    console.log("Lỗi thống kê theo tháng: ", error);
    return res.status(500).json("Lỗi máy chủ nội bộ");
  }
};

export const getYearlyStats = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await analytisService.getYearlyStats());
  } catch (error) {
    console.log("Lỗi thống kê theo năm: ", error);
    return res.status(500).json("Lỗi máy chủ nội bộ");
  }
};
