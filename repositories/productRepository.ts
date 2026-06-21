import prisma from "../config/prisma";

const findAllActive = () =>
  prisma.product.findMany({
    where: { is_delete: 0 },
  });

const findNewest = () =>
  prisma.product.findMany({
    where: { is_delete: 0 },
    orderBy: { pro_create: "desc" },
    take: 6,
  });

const findByIdWithCategory = (proId: number) =>
  prisma.$queryRaw`
    SELECT *
    FROM Product c
    JOIN Category cate ON c.cate_id = cate.cate_id
    WHERE c.pro_id = ${proId}
  `;

const findById = (proId: number) =>
  prisma.product.findUnique({
    where: { pro_id: proId },
  });

const findByCategory = (cateId: number) =>
  prisma.product.findMany({
    where: { cate_id: cateId },
  });

const findByName = (proName: string) =>
  prisma.product.findFirst({
    where: { pro_name: proName },
  });

const findByNamePrefix = (proName: string) =>
  prisma.product.findMany({
    where: { pro_name: { startsWith: proName } },
  });

const search = (keyword: string, cateId?: number) =>
  prisma.product.findMany({
    where: {
      OR: [
        { pro_name: { startsWith: keyword } },
        ...(cateId ? [{ cate_id: cateId }] : []),
        { price: Number(keyword) || -1 },
        { pro_origin: { startsWith: keyword } },
        { pro_brand: { startsWith: keyword } },
      ],
    },
  });

const create = (data: {
  cate_id: number;
  pro_name: string;
  pro_img: string;
  price: number;
  pro_origin: string;
  pro_brand: string;
  pro_description: string;
  pro_create: Date;
  is_delete: number;
}) => prisma.product.create({ data });

const update = (
  proId: number,
  data: {
    cate_id: number;
    pro_name: string;
    price: number;
    pro_origin: string;
    pro_brand: string;
    pro_description: string;
    pro_update: Date;
  }
) =>
  prisma.product.update({
    where: { pro_id: proId },
    data,
  });

const softDelete = (proId: number) =>
  prisma.product.update({
    where: { pro_id: proId },
    data: { is_delete: 1 },
  });

export default {
  create,
  findAllActive,
  findByCategory,
  findById,
  findByIdWithCategory,
  findByName,
  findByNamePrefix,
  findNewest,
  search,
  softDelete,
  update,
};
