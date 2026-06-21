import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import customerRepository from "../repositories/customerRepository";
import { ServiceResponse } from "../types/serviceResponse";

const getAllCustomer = async (): Promise<ServiceResponse> => {
  const result = await customerRepository.findAll();

  if (result.length === 0) {
    return { message: "List Customer Empty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const updateCustomer = async (body: any): Promise<ServiceResponse> => {
  const { cus_email, cus_name, cus_address, cus_birthday, cus_phone, cus_avatar } =
    body;

  if (!cus_email || !cus_name || !cus_address || !cus_birthday || !cus_phone || !cus_avatar) {
    return {
      message: "Email,Name, Address, Birthday, Phone is Require!!",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const customer = await customerRepository.findByEmail(cus_email);

  if (!customer) {
    return { message: "Customer not found", statusCode: 404 };
  }

  await customerRepository.updateByEmail(cus_email, {
    cus_name,
    cus_address,
    cus_birthday: new Date(cus_birthday),
    cus_phone,
    cus_update: new Date(),
    cus_avatar,
  });

  return { message: "Update Customer Success", statusCode: 200 };
};

const findCustomer = async (inforFind: string): Promise<ServiceResponse> => {
  if (!inforFind) {
    return {
      message: "Information Find is Require!!",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const result = await customerRepository.search(inforFind);

  if (result.length === 0) {
    return { message: "Customer not found", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const getProfileCustomerByEmail = async (auth?: string): Promise<ServiceResponse> => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return { message: "Unauthorized", statusCode: 401 };
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY ? process.env.JWT_KEY : ""
    ) as JwtPayload;
    const email = decoded ? decoded.email : "";

    if (!email) {
      return { message: "Email is Require!!", statusCode: 400, httpStatus: 400 };
    }

    const result = await customerRepository.findByEmail(email);

    if (!result) {
      return { message: "Customer not found", statusCode: 404 };
    }

    return { message: result as any, statusCode: 200 };
  } catch (error) {
    return { message: "Invalid or expired token", statusCode: 401 };
  }
};

export default {
  findCustomer,
  getAllCustomer,
  getProfileCustomerByEmail,
  updateCustomer,
};
