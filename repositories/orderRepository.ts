import prisma from "../config/prisma";

const findAllActiveWithDetails = () =>
  prisma.$queryRaw`
    SELECT o.*, od.detail_id, od.pro_id, od.detail_price, od.detail_quantity
    FROM \`Order\` o
    JOIN Order_Details od ON o.order_id = od.order_id
    WHERE o.is_rejected = 0
  `;

const findByCustomerId = (cusId: number) =>
  prisma.order.findMany({
    where: { cus_id: cusId, is_rejected: 0 },
  });

const findWithDetailsByCustomerId = (cusId: number) =>
  prisma.$queryRaw`
    SELECT
      o.order_id, o.cus_id, o.staff_id, o.order_name, o.order_phone,
      o.order_email, o.order_address, o.order_status, o.order_note,
      o.order_create, o.order_update, o.pay_status, o.is_rejected,
      od.detail_id, od.pro_id, od.detail_price, od.detail_quantity,
      p.pro_name, p.pro_img
    FROM \`Order\` o
    JOIN Order_Details od ON o.order_id = od.order_id
    JOIN Product p ON od.pro_id = p.pro_id
    WHERE o.cus_id = ${cusId}
  `;

const findById = (orderId: number) =>
  prisma.order.findMany({
    where: { order_id: orderId },
  });

const create = (data: {
  cus_id: number;
  staff_id: number | null;
  order_name: string;
  order_phone: string;
  order_email: string;
  order_address: string;
  order_note?: string | null;
  order_status: number;
  order_create: Date;
  pay_status: number;
  is_rejected: number;
}) => prisma.order.create({ data });

const update = (
  orderId: number,
  data: {
    staff_id: number;
    order_note?: string | null;
    order_status: number;
    pay_status: number;
    order_update: Date;
  }
) =>
  prisma.order.update({
    where: { order_id: orderId },
    data,
  });

const updateRejected = (orderId: number, isRejected: number) =>
  prisma.order.update({
    where: { order_id: orderId },
    data: { is_rejected: isRejected },
  });

export default {
  create,
  findAllActiveWithDetails,
  findByCustomerId,
  findById,
  findWithDetailsByCustomerId,
  update,
  updateRejected,
};
