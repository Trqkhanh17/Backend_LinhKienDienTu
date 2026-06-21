import staffRepository from "../repositories/staffRepository";
import { ServiceResponse } from "../types/serviceResponse";

const getAllStaff = async (): Promise<ServiceResponse> => {
  const result = await staffRepository.findAll();

  if (result.length === 0) {
    return { message: "List staff empty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const updateStaffProfile = async (body: any): Promise<ServiceResponse> => {
  const { staff_email, staff_name, staff_phone } = body;

  if (!staff_email || !staff_name || !staff_phone) {
    return {
      message: "Email, Name and Phone is Require!!",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  await staffRepository.updateByEmail(staff_email, staff_name, staff_phone);

  return { message: "Update Profile Successfully", statusCode: 200 };
};

const findStaff = async (inforFind: string): Promise<ServiceResponse> => {
  if (!inforFind) {
    return {
      message: "Information Find is Require!!",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const result = await staffRepository.search(inforFind);

  if (result.length === 0) {
    return { message: "Staff not found", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const getStaffById = async (staffId: string | number): Promise<ServiceResponse> => {
  if (!staffId) {
    return { message: "Staff ID is Require!!", statusCode: 400, httpStatus: 400 };
  }

  const result = await staffRepository.findById(Number(staffId));

  if (!result) {
    return { message: "Staff not found", statusCode: 404 };
  }

  return { data: [result], statusCode: 200 };
};

export default {
  findStaff,
  getAllStaff,
  getStaffById,
  updateStaffProfile,
};
