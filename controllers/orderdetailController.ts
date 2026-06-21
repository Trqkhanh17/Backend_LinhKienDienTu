import { Request, Response } from "express";
import orderDetailService from "../services/orderDetailService";
import { sendServiceResponse } from "../utils/controllerResponse";

export const getAlloOrderDetails = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await orderDetailService.getAlloOrderDetails()
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrderDetail = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await orderDetailService.createOrderDetail(req.body)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getOrderDetailById = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await orderDetailService.getOrderDetailById(req.params.id)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderDetailByOrderId = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await orderDetailService.getOrderDetailByOrderId(req.params.id)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrderDetail = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await orderDetailService.updateOrderDetail(req.body)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
