import categoryRepository from "../repositories/categoryRepository";
import productRepository from "../repositories/productRepository";
import stockRepository from "../repositories/stockRepository";
import { ServiceResponse } from "../types/serviceResponse";

const getAllProduct = async (): Promise<ServiceResponse> => {
  const result = await productRepository.findAllActive();

  if (result.length === 0) {
    return { message: "List Product Emty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const createProduct = async (body: any): Promise<ServiceResponse> => {
  const {
    cate_id,
    pro_name,
    pro_img,
    price,
    pro_origin,
    pro_brand,
    pro_description,
  } = body;

  if (!cate_id || !pro_name || !price || !pro_origin || !pro_brand || !pro_description || !pro_img) {
    return {
      message: "Category name, Product name, price, origin, brand, description is Require!!",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const product = await productRepository.create({
    cate_id: Number(cate_id),
    pro_name,
    pro_img,
    price: Number(price),
    pro_origin,
    pro_brand,
    pro_description,
    pro_create: new Date(),
    is_delete: 0,
  });

  await stockRepository.create({ pro_id: product.pro_id });

  return { message: "Create Product Successfully", statusCode: 200 };
};

const updateProduct = async (body: any): Promise<ServiceResponse> => {
  const { pro_id, cate_id, pro_name, price, pro_origin, pro_brand, pro_description } =
    body;

  if (!cate_id || !pro_name || !price || !pro_origin || !pro_brand || !pro_description) {
    return {
      message: "Category name, Product name, price, origin, brand, description is Require!!",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  await productRepository.update(Number(pro_id), {
    cate_id: Number(cate_id),
    pro_name,
    price: Number(price),
    pro_origin,
    pro_brand,
    pro_description,
    pro_update: new Date(),
  });

  return { message: "Update Product Successfully", statusCode: 200 };
};

const deleteProduct = async (proId: string | number): Promise<ServiceResponse> => {
  if (!proId) {
    return { message: "Product id is Require!!", statusCode: 400, httpStatus: 400 };
  }

  await productRepository.softDelete(Number(proId));

  return { message: "Delete Product Successfully", statusCode: 200 };
};

const findProduct = async (inforFind: string): Promise<ServiceResponse> => {
  if (!inforFind) {
    return {
      message: "Please provide search information",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const categories = await categoryRepository.findByNamePrefix(inforFind);
  const result = await productRepository.search(inforFind, categories[0]?.cate_id);

  if (result.length === 0) {
    return { message: "Product Not Found", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const getProductById = async (proId: string): Promise<ServiceResponse> => {
  if (!proId) {
    return { message: "Product ID is Require!!", statusCode: 400, httpStatus: 400 };
  }

  const result = await productRepository.findByIdWithCategory(Number(proId));

  if ((result as any[]).length === 0) {
    return { message: "Product not found", statusCode: 404, httpStatus: 404 };
  }

  return { data: result, statusCode: 200 };
};

const getProductByCategory = async (cateId: string): Promise<ServiceResponse> => {
  if (!cateId) {
    return { message: "Category ID is Require!!", statusCode: 400, httpStatus: 400 };
  }

  const result = await productRepository.findByCategory(Number(cateId));

  if (result.length === 0) {
    return { message: "Product not found", statusCode: 404, httpStatus: 404 };
  }

  return { data: result, statusCode: 200 };
};

const newProduct = async (): Promise<ServiceResponse> => {
  const result = await productRepository.findNewest();

  if (result.length === 0) {
    return { message: "List Product Emty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

export default {
  createProduct,
  deleteProduct,
  findProduct,
  getAllProduct,
  getProductByCategory,
  getProductById,
  newProduct,
  updateProduct,
};
