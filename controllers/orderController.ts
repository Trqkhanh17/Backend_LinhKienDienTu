import { Request, Response } from "express";
import orderService from "../services/orderService";
import { sendServiceResponse } from "../utils/controllerResponse";

export const getAllOrder = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await orderService.getAllOrder());
  } catch (error) {
    console.log("Get all order error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await orderService.createOrder(req.body));
  } catch (error) {
    console.log("Create order error: ", error);
    return res.status(500).json(error);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await orderService.updateOrder(req.body));
  } catch (error) {
    console.log("Update order error: ", error);
    return res.status(500).json({ message: "Internal Server Error", statusCode: 500 });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await orderService.deleteOrder(req.body.order_id)
    );
  } catch (error) {
    console.log("Delete order error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const unDeleteOrder = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await orderService.unDeleteOrder(req.body.order_id)
    );
  } catch (error) {
    console.log("UnDelete order error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const findOrder = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await orderService.findOrder());
  } catch (error) {
    console.log("Find order error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getOrderByCustomerId = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await orderService.getOrderByCustomerId(req.params.cusId)
    );
  } catch (error) {
    console.log("Get order by customer id error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getOrderAndOrderDetailByCustomerId = async (
  req: Request,
  res: Response
) => {
  try {
    return sendServiceResponse(
      res,
      await orderService.getOrderAndOrderDetailByCustomerId(req.params.cusId)
    );
  } catch (error) {
    console.log("Get order and order detail error: ", error);
    return res.status(500).json(error);
  }
};

export const getOrderByOrderId = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await orderService.getOrderByOrderId(req.params.orderId)
    );
  } catch (error) {
    return res.status(500).json(error);
  }
};
