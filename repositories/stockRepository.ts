import prisma from "../config/prisma";

const findAll = () => prisma.stock.findMany();

const findById = (stockId: number) =>
  prisma.stock.findUnique({ where: { stock_id: stockId } });

const findByProductId = (proId: number) =>
  prisma.stock.findMany({ where: { pro_id: proId } });

const findFirstByProductId = (proId: number) =>
  prisma.stock.findFirst({ where: { pro_id: proId } });

const create = (data: {
  staff_id?: number;
  pro_id: number;
  stock_import?: number;
  stock_export?: number;
  date_import?: Date;
  stock_update?: Date;
}) => prisma.stock.create({ data });

const updateImport = (
  stockId: number,
  staffId: number,
  proId: number,
  stockImport: number,
  stockUpdate: Date
) =>
  prisma.stock.update({
    where: { stock_id: stockId },
    data: {
      staff_id: staffId,
      pro_id: proId,
      stock_import: stockImport,
      stock_update: stockUpdate,
    },
  });

const updateExportByProductId = (
  proId: number,
  stockImport: number,
  stockExport: number
) =>
  prisma.stock.updateMany({
    where: { pro_id: proId },
    data: {
      stock_import: stockImport,
      stock_export: stockExport,
    },
  });

const remove = (stockId: number) =>
  prisma.stock.delete({
    where: { stock_id: stockId },
  });

export default {
  create,
  findAll,
  findById,
  findByProductId,
  findFirstByProductId,
  remove,
  updateExportByProductId,
  updateImport,
};
