export type ServiceResponse<T = unknown> = {
  data?: T;
  message?: string;
  statusCode: number;
  httpStatus?: number;
  token?: string;
  role?: number;
};
