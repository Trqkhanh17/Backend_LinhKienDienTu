import prisma from "../config/prisma";

const findAll = () => prisma.gallery.findMany();

const findById = (galId: number) =>
  prisma.gallery.findUnique({ where: { gal_id: galId } });

const create = (proId: number, galImg: string) =>
  prisma.gallery.create({
    data: { pro_id: proId, gal_img: galImg },
  });

const update = (galId: number, proId: number, galImg: string) =>
  prisma.gallery.update({
    where: { gal_id: galId },
    data: { pro_id: proId, gal_img: galImg },
  });

const remove = (galId: number) =>
  prisma.gallery.delete({
    where: { gal_id: galId },
  });

export default {
  create,
  findAll,
  findById,
  remove,
  update,
};
