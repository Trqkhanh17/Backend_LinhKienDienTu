import { compare, genSalt, hash } from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import accountRepository from "../repositories/accountRepository";
import customerRepository from "../repositories/customerRepository";
import staffRepository from "../repositories/staffRepository";
import { ServiceResponse } from "../types/serviceResponse";
import {
  createToken,
  isValidName,
  verifyEmail,
  verifyPhoneNumber,
} from "../utils";

const login = async (
  accEmail: string,
  password: string
): Promise<ServiceResponse> => {
  if (!accEmail || !password) {
    return { message: "Email or password is Require!!", statusCode: 400 };
  }

  const account = await accountRepository.findByEmail(accEmail);

  if (!account) {
    return { message: "Account not found!", statusCode: 404 };
  }

  const auth = await compare(password, account.password);

  if (!auth) {
    return { message: "Password is incorrect!!", statusCode: 401 };
  }

  if (account.is_admin === 0) {
    const customer = await customerRepository.findByEmail(accEmail);

    if (customer?.is_banned === 1) {
      return { message: "Account is banned", statusCode: 403 };
    }
  }

  const token = createToken(accEmail, account.is_admin);

  return {
    message: "Login Successfully",
    token,
    role: account.is_admin,
    statusCode: 200,
  };
};

const signUpCustomer = async (body: any): Promise<ServiceResponse> => {
  const {
    acc_email,
    password,
    cus_name,
    cus_address,
    cus_phone,
    cus_birthday,
  } = body;
  const birthday = new Date(cus_birthday);

  if (
    !acc_email ||
    !password ||
    !cus_name ||
    !cus_address ||
    !cus_phone ||
    !cus_birthday
  ) {
    return { message: "Missing required field!!!", statusCode: 400 };
  }

  if (!isValidName(cus_name)) {
    return { message: "Name is invalid", statusCode: 401 };
  }

  if (birthday.getFullYear() >= new Date().getFullYear()) {
    return { message: "Birthday is invalid", statusCode: 402 };
  }

  if (!verifyEmail(acc_email)) {
    return { message: "Email is invalid", statusCode: 403 };
  }

  if (!verifyPhoneNumber(cus_phone)) {
    return { message: "Phone is invalid", statusCode: 405 };
  }

  const exists = await accountRepository.findByEmail(acc_email);

  if (exists) {
    return { message: "Email already exists", statusCode: 404 };
  }

  const salt = await genSalt();
  const hashPass = await hash(password, salt);

  await accountRepository.create(acc_email, hashPass, 0);
  await customerRepository.create({
    cus_name,
    cus_address,
    cus_birthday: birthday,
    cus_phone,
    cus_email: acc_email,
    cus_create: new Date(),
    is_banned: 0,
  });

  const token = createToken(acc_email, 0);

  return {
    message: "Reister Successfully",
    token,
    statusCode: 200,
    httpStatus: 201,
  };
};

const signUpStaff = async (body: any): Promise<ServiceResponse> => {
  const { acc_email, password, staff_name, staff_phone, comfirmPass } = body;

  if (!acc_email || !password || !staff_name || !staff_phone) {
    return { message: "Vui lòng điền đầy đủ thông tin", statusCode: 400 };
  }

  const exists = await accountRepository.findByEmail(acc_email);

  if (exists) {
    return { message: "Email đã tồn tại", statusCode: 409 };
  }

  if (!verifyEmail(acc_email)) {
    return { message: "Email không hợp lệ", statusCode: 402 };
  }

  if (!verifyPhoneNumber(staff_phone)) {
    return { message: "Số điện thoại không hợp lệ", statusCode: 403 };
  }

  if (password !== comfirmPass) {
    return { message: "Mật khẩu không khớp", statusCode: 404 };
  }

  const salt = await genSalt();
  const hashPass = await hash(password, salt);

  await accountRepository.create(acc_email, hashPass, 1);
  await staffRepository.create(staff_name, staff_phone, acc_email);

  const token = createToken(acc_email, 1);

  return {
    message: "Reister Successfully",
    token,
    statusCode: 200,
    httpStatus: 201,
  };
};

const getProfile = async (auth?: string): Promise<ServiceResponse> => {
  if (auth === "" || !auth) {
    return { message: "", statusCode: 403 };
  }

  const token = auth.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_KEY + "") as JwtPayload;

  if (user.role === 0) {
    const result = await customerRepository.findByEmail(user.email);
    return { data: result ? [result] : [], statusCode: 200 };
  }

  const result = await staffRepository.findByEmail(user.email);
  return { data: result ? [result] : [], statusCode: 200 };
};

export default {
  getProfile,
  login,
  signUpCustomer,
  signUpStaff,
};
