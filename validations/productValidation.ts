import { z } from "zod";
import {
  positiveIntSchema,
  positiveNumberSchema,
  requiredString,
} from "./commonValidation";

export const createProductSchema = z.object({
  cate_id: positiveIntSchema("cate_id"),
  pro_name: requiredString("pro_name"),
  pro_img: requiredString("pro_img"),
  price: positiveNumberSchema("price"),
  pro_origin: requiredString("pro_origin"),
  pro_brand: requiredString("pro_brand"),
  pro_description: requiredString("pro_description"),
});

export const updateProductSchema = z.object({
  pro_id: positiveIntSchema("pro_id"),
  cate_id: positiveIntSchema("cate_id"),
  pro_name: requiredString("pro_name"),
  price: positiveNumberSchema("price"),
  pro_origin: requiredString("pro_origin"),
  pro_brand: requiredString("pro_brand"),
  pro_description: requiredString("pro_description"),
});

export const deleteProductSchema = z.object({
  pro_id: positiveIntSchema("pro_id"),
});

export const findProductSchema = z.object({
  inforFind: requiredString("inforFind"),
});
