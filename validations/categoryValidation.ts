import { z } from "zod";
import { positiveIntSchema, requiredString } from "./commonValidation";

export const createCategorySchema = z.object({
  cate_name: requiredString("cate_name"),
});

export const updateCategorySchema = z.object({
  cate_id: positiveIntSchema("cate_id"),
  cate_name: requiredString("cate_name"),
});

export const deleteCategorySchema = z.object({
  cate_id: positiveIntSchema("cate_id"),
});

export const findCategorySchema = z.object({
  cate_name: requiredString("cate_name"),
});
