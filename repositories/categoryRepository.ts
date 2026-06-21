import prisma from "../config/prisma";

const findAll = () => {
  return prisma.category.findMany();
};

const findById = (cateId: number) => {
  return prisma.category.findUnique({
    where: { cate_id: cateId },
  });
};

const findByNamePrefix = (cateName: string) => {
  return prisma.category.findMany({
    where: {
      cate_name: {
        startsWith: cateName,
      },
    },
  });
};

const create = (cateName: string) => {
  return prisma.category.create({
    data: { cate_name: cateName },
  });
};

const update = (cateId: number, cateName: string) => {
  return prisma.category.update({
    where: { cate_id: cateId },
    data: { cate_name: cateName },
  });
};

const remove = (cateId: number) => {
  return prisma.category.delete({
    where: { cate_id: cateId },
  });
};

export default {
  create,
  findAll,
  findById,
  findByNamePrefix,
  remove,
  update,
};
