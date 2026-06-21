import { z } from "zod";
import {
  emailSchema,
  positiveIntSchema,
  requiredString,
} from "./commonValidation";

export const createOrderSchema = z.object({
  cus_id: positiveIntSchema("cus_id"),
  order_name: requiredString("order_name"),
  order_phone: requiredString("order_phone"),
  order_email: emailSchema,
  order_address: requiredString("order_address"),
  order_note: z.string().optional(),
});

export const updateOrderSchema = z.object({
  order_id: positiveIntSchema("order_id"),
  staff_id: positiveIntSchema("staff_id"),
  order_note: z.string().optional(),
  order_status: z.coerce.number().int().min(0).max(3),
  pay_status: z.coerce.number().int().min(0).max(1),
});

export const orderIdBodySchema = z.object({
  order_id: positiveIntSchema("order_id"),
});
