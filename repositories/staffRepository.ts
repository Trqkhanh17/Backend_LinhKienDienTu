import prisma from "../config/prisma";

const findAll = () => prisma.staff.findMany();

const findByEmail = (email: string) =>
  prisma.staff.findUnique({ where: { staff_email: email } });

const findById = (staffId: number) =>
  prisma.staff.findUnique({ where: { staff_id: staffId } });

const search = (keyword: string) =>
  prisma.staff.findMany({
    where: {
      OR: [
        { staff_email: { startsWith: keyword } },
        { staff_name: { startsWith: keyword } },
        { staff_phone: { startsWith: keyword } },
      ],
    },
  });

const create = (staffName: string, staffPhone: string, staffEmail: string) =>
  prisma.staff.create({
    data: {
      staff_name: staffName,
      staff_phone: staffPhone,
      staff_email: staffEmail,
    },
  });

const updateByEmail = (email: string, staffName: string, staffPhone: string) =>
  prisma.staff.update({
    where: { staff_email: email },
    data: { staff_name: staffName, staff_phone: staffPhone },
  });

export default {
  create,
  findAll,
  findByEmail,
  findById,
  search,
  updateByEmail,
};
