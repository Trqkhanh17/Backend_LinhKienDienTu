import { z } from "zod";
import {
  positiveIntSchema,
  positiveNumberSchema,
} from "./commonValidation";

export const createOrderDetailSchema = z.object({
  order_id: positiveIntSchema("order_id"),
  pro_id: positiveIntSchema("pro_id"),
  detail_price: positiveNumberSchema("detail_price"),
  detail_quantity: positiveIntSchema("detail_quantity"),
});

export const updateOrderDetailSchema = createOrderDetailSchema.extend({
  detail_id: positiveIntSchema("detail_id"),
});
