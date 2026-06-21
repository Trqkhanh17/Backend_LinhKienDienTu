import analytisRepository from "../repositories/analytisRepository";
import { ServiceResponse } from "../types/serviceResponse";

const getOverallStats = async (): Promise<ServiceResponse> => {
  const result = (await analytisRepository.getOverallStats()) as any[];

  if (result.length === 0) {
    return { message: "Thống kê đơn hàng rỗng", statusCode: 404 };
  }

  return { data: result[0], statusCode: 200 };
};

const getDailyStats = async (date: string): Promise<ServiceResponse> => {
  if (!date) {
    return {
      message: "Vui lòng nhập ngày cần thống kê",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(date)) {
    return {
      message: "Ngày không hợp lệ. Vui lòng nhập theo định dạng YYYY-MM-DD.",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const result = await analytisRepository.getDailyStats(date);

  return { data: result, statusCode: 200 };
};

const getMonthlyStats = async (): Promise<ServiceResponse> => {
  const result = await analytisRepository.getMonthlyStats();
  return { data: result, statusCode: 200 };
};

const getYearlyStats = async (): Promise<ServiceResponse> => {
  const result = await analytisRepository.getYearlyStats();
  return { data: result, statusCode: 200 };
};

export default {
  getDailyStats,
  getMonthlyStats,
  getOverallStats,
  getYearlyStats,
};
