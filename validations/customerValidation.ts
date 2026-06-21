import { z } from "zod";
import { emailSchema, requiredString } from "./commonValidation";

export const updateCustomerSchema = z.object({
  cus_email: emailSchema,
  cus_name: requiredString("cus_name"),
  cus_address: requiredString("cus_address"),
  cus_birthday: requiredString("cus_birthday"),
  cus_phone: requiredString("cus_phone"),
  cus_avatar: requiredString("cus_avatar"),
});

export const findCustomerSchema = z.object({
  inforFind: requiredString("inforFind"),
});
