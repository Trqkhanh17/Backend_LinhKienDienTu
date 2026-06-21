import { z } from "zod";
import { positiveIntSchema, requiredString } from "./commonValidation";

export const createStockSchema = z.object({
  staff_id: positiveIntSchema("staff_id"),
  pro_id: positiveIntSchema("pro_id"),
  stock_import: positiveIntSchema("stock_import"),
});

export const updateStockSchema = z.object({
  stock_id: positiveIntSchema("stock_id"),
  staff_id: positiveIntSchema("staff_id"),
  pro_id: positiveIntSchema("pro_id"),
  stock_import: positiveIntSchema("stock_import"),
});

export const exportStockSchema = z.object({
  pro_id: positiveIntSchema("pro_id"),
  stock_export: positiveIntSchema("stock_export"),
});

export const deleteStockSchema = z.object({
  stock_id: positiveIntSchema("stock_id"),
});

export const findStockSchema = z.object({
  pro_name: requiredString("pro_name"),
});
