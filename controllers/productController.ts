import { Request, Response } from "express";
import productService from "../services/productService";
import { sendServiceResponse } from "../utils/controllerResponse";

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await productService.getAllProduct());
  } catch (error) {
    console.log("Get all product error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await productService.createProduct(req.body));
  } catch (error) {
    console.log("Create product error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await productService.updateProduct(req.body));
  } catch (error) {
    console.log("Update product error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await productService.deleteProduct(req.body.pro_id)
    );
  } catch (error) {
    console.log("Delete product error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const findProduct = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await productService.findProduct(req.body.inforFind)
    );
  } catch (error) {
    console.log("Find product error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await productService.getProductById(req.params.proId)
    );
  } catch (error) {
    console.log("Get product by id error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getProductByCategory = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await productService.getProductByCategory(req.params.cateId)
    );
  } catch (error) {
    console.log("Get product by category error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const newProduct = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await productService.newProduct());
  } catch (error) {
    console.log("Get all product error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};
