import galleryRepository from "../repositories/galleryRepository";
import productRepository from "../repositories/productRepository";
import { ServiceResponse } from "../types/serviceResponse";

const findProductByIdOrName = (value: string | number) => {
  const productId = Number(value);

  if (Number.isInteger(productId)) {
    return productRepository.findById(productId);
  }

  return productRepository.findByName(String(value));
};

const getAllGallery = async (): Promise<ServiceResponse> => {
  const result = await galleryRepository.findAll();

  if (result.length === 0) {
    return { message: "List Gallery Empty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const createGallery = async (body: any): Promise<ServiceResponse> => {
  const { pro_id, gal_img } = body;

  if (!pro_id || !gal_img) {
    return {
      message: "product name and image is Require!!",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const product = await findProductByIdOrName(pro_id);

  if (!product) {
    return { message: "Product not found", statusCode: 404, httpStatus: 404 };
  }

  await galleryRepository.create(product.pro_id, gal_img);

  return { message: "Create Gallery Success", statusCode: 201, httpStatus: 201 };
};

const updateGallery = async (body: any): Promise<ServiceResponse> => {
  const { gal_id, pro_name, gal_img } = body;

  if (!gal_id || !pro_name || !gal_img) {
    return {
      message: "Gallery ID, product name and image is Require!!",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  const product = await productRepository.findByName(pro_name);

  if (!product) {
    return { message: "Product not found", statusCode: 404, httpStatus: 404 };
  }

  await galleryRepository.update(Number(gal_id), product.pro_id, gal_img);

  return { message: "Update Gallery Success", statusCode: 200 };
};

const deleteGallery = async (galId: string | number): Promise<ServiceResponse> => {
  if (!galId) {
    return { message: "Gallery ID is Require!!", statusCode: 400, httpStatus: 400 };
  }

  const gallery = await galleryRepository.findById(Number(galId));

  if (!gallery) {
    return { message: "Gallery not found", statusCode: 404, httpStatus: 404 };
  }

  await galleryRepository.remove(Number(galId));

  return { message: "Delete Gallery Success", statusCode: 200 };
};

const getGalleryById = async (galId: string | number): Promise<ServiceResponse> => {
  if (!galId) {
    return { message: "Gallery ID is Require!!", statusCode: 400, httpStatus: 400 };
  }

  const result = await galleryRepository.findById(Number(galId));

  if (!result) {
    return { message: "Gallery not found", statusCode: 404, httpStatus: 404 };
  }

  return { data: [result], statusCode: 200 };
};

export default {
  createGallery,
  deleteGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
};
