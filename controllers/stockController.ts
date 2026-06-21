import { Request, Response } from "express";
import stockService from "../services/stockService";
import { sendServiceResponse } from "../utils/controllerResponse";

export const getAllStock = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await stockService.getAllStock());
  } catch (error) {
    console.log("Change Password Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const createStock = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await stockService.createStock(req.body));
  } catch (error) {
    console.log("Create stock error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await stockService.updateStock(req.body));
  } catch (error) {
    console.log("Update stock error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const exportStock = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await stockService.exportStock(req.body));
  } catch (error) {
    console.error("Lỗi cập nhật kho hàng:", error);
    return res.status(500).json({ message: "Lỗi máy chủ", statusCode: 500 });
  }
};

export const deleteStock = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await stockService.deleteStock(req.body.stock_id)
    );
  } catch (error) {
    console.log("Delete stock error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const findStock = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await stockService.findStock(String(req.query.pro_name)));
  } catch (error) {
    console.log("Find stock error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getStockByProId = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await stockService.getStockByProId(req.params.proId)
    );
  } catch (error) {
    console.log("Get stock by id error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};
