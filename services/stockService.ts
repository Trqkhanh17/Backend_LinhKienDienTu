import productRepository from "../repositories/productRepository";
import stockRepository from "../repositories/stockRepository";
import { ServiceResponse } from "../types/serviceResponse";

const getAllStock = async (): Promise<ServiceResponse> => {
  const result = await stockRepository.findAll();

  if (result.length === 0) {
    return { message: "List stock empty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const createStock = async (body: any): Promise<ServiceResponse> => {
  const { staff_id, pro_id, stock_import } = body;

  if (!staff_id || !pro_id || !stock_import) {
    return {
      message: "Staff id, product id, stock import is require",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  await stockRepository.create({
    staff_id: Number(staff_id),
    pro_id: Number(pro_id),
    stock_import: Number(stock_import),
    stock_export: 0,
    date_import: new Date(),
    stock_update: new Date(),
  });

  return { message: "Create stock success", statusCode: 200, httpStatus: 201 };
};

const updateStock = async (body: any): Promise<ServiceResponse> => {
  const { stock_id, staff_id, pro_id, stock_import } = body;

  if (!stock_id || !staff_id || !pro_id || !stock_import) {
    return {
      message: "Stock id, staff id, product id, stock import, stock export is require",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const stock = await stockRepository.findById(Number(stock_id));

  if (!stock) {
    return { message: "Stock not found", statusCode: 404, httpStatus: 404 };
  }

  const quantity = stock.stock_import + Number(stock_import);
  await stockRepository.updateImport(
    Number(stock_id),
    Number(staff_id),
    Number(pro_id),
    quantity,
    new Date()
  );

  return { message: "Update stock success", statusCode: 200 };
};

const exportStock = async (body: any): Promise<ServiceResponse> => {
  const { pro_id, stock_export } = body;
  const exportQuantity = Number(stock_export);

  if (!pro_id || !stock_export || !Number.isFinite(exportQuantity) || exportQuantity <= 0) {
    return {
      message: "Stock ID và số lượng xuất phải được cung cấp và không được âm",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const stock = await stockRepository.findFirstByProductId(Number(pro_id));

  if (!stock) {
    return { message: "Kho hàng không tồn tại", statusCode: 404, httpStatus: 404 };
  }

  if (stock.stock_import < exportQuantity) {
    return {
      message: "Số lượng xuất vượt quá số lượng tồn kho",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  await stockRepository.updateExportByProductId(
    Number(pro_id),
    stock.stock_import - exportQuantity,
    stock.stock_export + exportQuantity
  );

  return { message: "Cập nhật kho hàng thành công", statusCode: 200 };
};

const deleteStock = async (stockId: string | number): Promise<ServiceResponse> => {
  if (!stockId) {
    return { message: "Stock id is require", statusCode: 400, httpStatus: 400 };
  }

  await stockRepository.remove(Number(stockId));

  return { message: "Delete stock success", statusCode: 200 };
};

const findStock = async (proName: string): Promise<ServiceResponse> => {
  if (!proName) {
    return { message: "Stock id is require", statusCode: 400, httpStatus: 400 };
  }

  const products = await productRepository.findByNamePrefix(proName);

  if (products.length === 0) {
    return { message: "Stock not found", statusCode: 404, httpStatus: 404 };
  }

  const result = await stockRepository.findByProductId(products[0].pro_id);

  if (result.length === 0) {
    return { message: "Stock not found", statusCode: 404, httpStatus: 404 };
  }

  return { data: result, statusCode: 200 };
};

const getStockByProId = async (proId: string): Promise<ServiceResponse> => {
  if (!proId) {
    return { message: "Product id is require", statusCode: 400, httpStatus: 400 };
  }

  const result = await stockRepository.findByProductId(Number(proId));

  if (result.length === 0) {
    return { message: "Stock not found", statusCode: 404, httpStatus: 404 };
  }

  return { data: result, statusCode: 200 };
};

export default {
  createStock,
  deleteStock,
  exportStock,
  findStock,
  getAllStock,
  getStockByProId,
  updateStock,
};
