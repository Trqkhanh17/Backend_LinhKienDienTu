import prisma from "../config/prisma";

const findAll = () => prisma.customer.findMany();

const findByEmail = (email: string) =>
  prisma.customer.findUnique({ where: { cus_email: email } });

const search = (keyword: string) =>
  prisma.customer.findMany({
    where: {
      OR: [
        { cus_email: { startsWith: keyword } },
        { cus_name: { startsWith: keyword } },
        { cus_address: { startsWith: keyword } },
        { cus_phone: { startsWith: keyword } },
      ],
    },
  });

const create = (data: {
  cus_name: string;
  cus_address: string;
  cus_birthday: Date;
  cus_phone: string;
  cus_email: string;
  cus_create: Date;
  is_banned: number;
}) => prisma.customer.create({ data });

const updateByEmail = (
  email: string,
  data: {
    cus_name: string;
    cus_address: string;
    cus_birthday: Date;
    cus_phone: string;
    cus_update: Date;
    cus_avatar: string;
  }
) =>
  prisma.customer.update({
    where: { cus_email: email },
    data,
  });

const updateBanStatus = (email: string, isBanned: number) =>
  prisma.customer.update({
    where: { cus_email: email },
    data: { is_banned: isBanned },
  });

export default {
  create,
  findAll,
  findByEmail,
  search,
  updateBanStatus,
  updateByEmail,
};
