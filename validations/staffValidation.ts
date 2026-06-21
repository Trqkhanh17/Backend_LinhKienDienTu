import { z } from "zod";
import { emailSchema, requiredString } from "./commonValidation";

export const updateStaffProfileSchema = z.object({
  staff_email: emailSchema,
  staff_name: requiredString("staff_name"),
  staff_phone: requiredString("staff_phone"),
});

export const findStaffSchema = z.object({
  inforFind: requiredString("inforFind"),
});
