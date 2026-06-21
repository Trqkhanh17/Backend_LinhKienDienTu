import { z } from "zod";
import { emailSchema, requiredString } from "./commonValidation";

export const accountEmailSchema = z.object({
  acc_email: emailSchema,
});

export const changePasswordSchema = z
  .object({
    email: emailSchema,
    old_password: requiredString("old_password").min(6, "old_password must have at least 6 characters"),
    new_password: requiredString("new_password").min(6, "new_password must have at least 6 characters"),
    comfirm_password: requiredString("comfirm_password"),
  })
  .refine((data) => data.new_password === data.comfirm_password, {
    message: "Password confirmation does not match",
    path: ["comfirm_password"],
  });
