import orderDetailRepository from "../repositories/orderDetailRepository";
import { ServiceResponse } from "../types/serviceResponse";

const getAlloOrderDetails = async (): Promise<ServiceResponse> => {
  const results = await orderDetailRepository.findAll();

  if (results.length === 0) {
    return { message: "No order details found", statusCode: 404, httpStatus: 404 };
  }

  return { data: results, statusCode: 200 };
};

const createOrderDetail = async (body: any): Promise<ServiceResponse> => {
  const { order_id, pro_id, detail_price, detail_quantity } = body;

  if (!order_id || !pro_id || !detail_price || !detail_quantity) {
    return { message: "Please provide all fields", statusCode: 400 };
  }

  await orderDetailRepository.create({
    order_id: Number(order_id),
    pro_id: Number(pro_id),
    detail_price: Number(detail_price),
    detail_quantity: Number(detail_quantity),
  });

  return { message: "Order detail created successfully", statusCode: 200 };
};

const getOrderDetailById = async (id: string): Promise<ServiceResponse> => {
  const result = await orderDetailRepository.findById(Number(id));

  if (!result) {
    return { message: "Order detail not found", statusCode: 404, httpStatus: 404 };
  }

  return { data: result, statusCode: 200 };
};

const getOrderDetailByOrderId = async (id: string): Promise<ServiceResponse> => {
  const results = await orderDetailRepository.findByOrderId(Number(id));

  if (results.length === 0) {
    return { message: "Order detail not found", statusCode: 404, httpStatus: 404 };
  }

  return { data: results, statusCode: 200 };
};

const updateOrderDetail = async (body: any): Promise<ServiceResponse> => {
  const { detail_id, order_id, pro_id, detail_price, detail_quantity } = body;

  if (!detail_id || !order_id || !pro_id || !detail_price || !detail_quantity) {
    return { message: "Please provide all fields", statusCode: 400, httpStatus: 400 };
  }

  const detail = await orderDetailRepository.findById(Number(detail_id));

  if (!detail) {
    return { message: "Order detail not found", statusCode: 404, httpStatus: 404 };
  }

  await orderDetailRepository.update(Number(detail_id), {
    order_id: Number(order_id),
    pro_id: Number(pro_id),
    detail_price: Number(detail_price),
    detail_quantity: Number(detail_quantity),
  });

  return { message: "Order detail updated successfully", statusCode: 200 };
};

export default {
  createOrderDetail,
  getAlloOrderDetails,
  getOrderDetailById,
  getOrderDetailByOrderId,
  updateOrderDetail,
};
