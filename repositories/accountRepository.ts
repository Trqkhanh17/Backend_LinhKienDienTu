import prisma from "../config/prisma";

const findAll = () => prisma.account.findMany();

const findByEmail = (email: string) =>
  prisma.account.findUnique({ where: { acc_email: email } });

const findByEmailPrefix = (email: string) =>
  prisma.account.findMany({
    where: { acc_email: { startsWith: email } },
  });

const create = (accEmail: string, password: string, isAdmin: number) =>
  prisma.account.create({
    data: { acc_email: accEmail, password, is_admin: isAdmin },
  });

const updatePassword = (email: string, password: string) =>
  prisma.account.update({
    where: { acc_email: email },
    data: { password },
  });

export default {
  create,
  findAll,
  findByEmail,
  findByEmailPrefix,
  updatePassword,
};
