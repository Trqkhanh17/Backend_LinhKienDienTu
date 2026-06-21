import orderRepository from "../repositories/orderRepository";
import { ServiceResponse } from "../types/serviceResponse";
import { verifyEmail, verifyPhoneNumber } from "../utils";

const getAllOrder = async (): Promise<ServiceResponse> => {
  const result = await orderRepository.findAllActiveWithDetails();

  if ((result as any[]).length === 0) {
    return { message: "List Order Empty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const createOrder = async (body: any): Promise<ServiceResponse> => {
  const {
    cus_id,
    order_name,
    order_phone,
    order_email,
    order_address,
    order_note,
    pay_status,
  } = body;

  if (!cus_id || !order_name || !order_phone || !order_email || !order_address) {
    return { message: "Missing field", statusCode: 400 };
  }

  if (!verifyEmail(order_email)) {
    return { message: "Email is invalid", statusCode: 400 };
  }

  if (!verifyPhoneNumber(order_phone)) {
    return { message: "Phone number is invalid", statusCode: 400 };
  }

  const result = await orderRepository.create({
    cus_id: Number(cus_id),
    staff_id: null,
    order_name,
    order_phone,
    order_email,
    order_address,
    order_note,
    order_status: 0,
    order_create: new Date(),
    pay_status: Number(pay_status),
    is_rejected: 0,
  });

  return { data: result.order_id, statusCode: 200 };
};

const updateOrder = async (body: any): Promise<ServiceResponse> => {
  const { order_id, staff_id, order_note, order_status, pay_status } = body;

  if (!order_id || !staff_id || !order_status || !pay_status) {
    return { message: "Missing field", statusCode: 400, httpStatus: 400 };
  }

  if (order_status < 0 || order_status > 3) {
    return { message: "Order status is invalid", statusCode: 400, httpStatus: 400 };
  }

  if (pay_status < 0 || pay_status > 1) {
    return { message: "Pay status is invalid", statusCode: 400, httpStatus: 400 };
  }

  await orderRepository.update(Number(order_id), {
    staff_id: Number(staff_id),
    order_note,
    order_status: Number(order_status),
    pay_status: Number(pay_status),
    order_update: new Date(),
  });

  return { message: "Update Order Successfully", statusCode: 200 };
};

const updateRejected = async (
  orderId: string | number,
  isRejected: number,
  message: string
): Promise<ServiceResponse> => {
  if (!orderId) {
    return { message: "Missing field", statusCode: 400 };
  }

  await orderRepository.updateRejected(Number(orderId), isRejected);

  return { message, statusCode: 200 };
};

const deleteOrder = (orderId: string | number) =>
  updateRejected(orderId, 1, "Delete Order Successfully");

const unDeleteOrder = (orderId: string | number) =>
  updateRejected(orderId, 0, "UnDelete Order Successfully");

const getOrderByCustomerId = async (cusId: string): Promise<ServiceResponse> => {
  if (!cusId) {
    return { message: "Missing field", statusCode: 400 };
  }

  const result = await orderRepository.findByCustomerId(Number(cusId));

  if (result.length === 0) {
    return { message: "List Order Empty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const getOrderAndOrderDetailByCustomerId = async (
  cusId: string
): Promise<ServiceResponse> => {
  if (!cusId) {
    return { message: "Missing field", statusCode: 400 };
  }

  const result = await orderRepository.findWithDetailsByCustomerId(Number(cusId));

  if ((result as any[]).length === 0) {
    return { message: "List Order Empty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const getOrderByOrderId = async (orderId: string): Promise<ServiceResponse> => {
  if (!orderId) {
    return { message: "Missing field", statusCode: 400 };
  }

  const result = await orderRepository.findById(Number(orderId));

  return { data: result, message: "Get Order Successfuly!!", statusCode: 200 };
};

const findOrder = async (): Promise<ServiceResponse> => {
  return { message: "Missing field", statusCode: 400 };
};

export default {
  createOrder,
  deleteOrder,
  findOrder,
  getAllOrder,
  getOrderAndOrderDetailByCustomerId,
  getOrderByCustomerId,
  getOrderByOrderId,
  unDeleteOrder,
  updateOrder,
};
