import { compare, genSalt, hash } from "bcrypt";
import accountRepository from "../repositories/accountRepository";
import customerRepository from "../repositories/customerRepository";
import { ServiceResponse } from "../types/serviceResponse";

const getAllAccount = async (): Promise<ServiceResponse> => {
  const result = await accountRepository.findAll();

  if (result.length === 0) {
    return { message: "List account empty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const changePassword = async (body: {
  email: string;
  old_password: string;
  new_password: string;
  comfirm_password: string;
}): Promise<ServiceResponse> => {
  const { email, old_password, new_password, comfirm_password } = body;
  const account = await accountRepository.findByEmail(email);

  if (!account) {
    return { message: "Account not found", statusCode: 404 };
  }

  if (!old_password || !new_password || !comfirm_password) {
    return {
      message: "Old password or new password or comfirm password is Require!!",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  if (new_password !== comfirm_password) {
    return {
      message: "New password and comfirm password is not match",
      statusCode: 400,
    };
  }

  const checkPass = await compare(old_password, account.password);

  if (!checkPass) {
    return { message: "Old password is incorrect!!", statusCode: 401 };
  }

  const salt = await genSalt();
  const hashPass = await hash(new_password, salt);
  await accountRepository.updatePassword(email, hashPass);

  return { message: "Change password success", statusCode: 200 };
};

const updateCustomerBanStatus = async (
  accEmail: string,
  isBanned: number,
  successMessage: string,
  notFoundMessage: string,
  adminMessage: string
): Promise<ServiceResponse> => {
  const account = await accountRepository.findByEmail(accEmail);

  if (!account) {
    return { message: notFoundMessage, statusCode: 404 };
  }

  if (account.is_admin === 1) {
    return { message: adminMessage, statusCode: 403 };
  }

  await customerRepository.updateBanStatus(accEmail, isBanned);

  return { message: successMessage, statusCode: 200 };
};

const banndedCustomer = (accEmail: string) =>
  updateCustomerBanStatus(
    accEmail,
    1,
    "Khóa tài khoản thành công",
    "Account not found",
    "Can't banned staff account"
  );

const unBannedCustomer = (accEmail: string) =>
  updateCustomerBanStatus(
    accEmail,
    0,
    "Mở khóa tài khoản thành công",
    "Không tìm thấy tài khoản",
    "Không thể khóa tài khoản nhân viên"
  );

const findAccount = async (accEmail: string): Promise<ServiceResponse> => {
  if (!accEmail) {
    return { message: "Email is Require!!", statusCode: 400, httpStatus: 400 };
  }

  const result = await accountRepository.findByEmailPrefix(accEmail);

  if (result.length === 0) {
    return { message: "Account not found", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const getProfileAccountByEmail = async (
  accEmail: string
): Promise<ServiceResponse> => {
  if (!accEmail) {
    return { message: "Email is Require!!", statusCode: 400, httpStatus: 400 };
  }

  const result = await accountRepository.findByEmail(accEmail);

  if (!result) {
    return { message: "Account not found", statusCode: 404 };
  }

  return { data: [result], statusCode: 200 };
};

export default {
  banndedCustomer,
  changePassword,
  findAccount,
  getAllAccount,
  getProfileAccountByEmail,
  unBannedCustomer,
};
