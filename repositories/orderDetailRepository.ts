import prisma from "../config/prisma";

const findAll = () => prisma.orderDetail.findMany();

const findById = (detailId: number) =>
  prisma.orderDetail.findUnique({ where: { detail_id: detailId } });

const findByOrderId = (orderId: number) =>
  prisma.orderDetail.findMany({ where: { order_id: orderId } });

const create = (data: {
  order_id: number;
  pro_id: number;
  detail_price: number;
  detail_quantity: number;
}) => prisma.orderDetail.create({ data });

const update = (
  detailId: number,
  data: {
    order_id: number;
    pro_id: number;
    detail_price: number;
    detail_quantity: number;
  }
) =>
  prisma.orderDetail.update({
    where: { detail_id: detailId },
    data,
  });

export default {
  create,
  findAll,
  findById,
  findByOrderId,
  update,
};
