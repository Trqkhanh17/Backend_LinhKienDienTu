import { z } from "zod";
import { emailSchema, requiredString } from "./commonValidation";

export const loginSchema = z.object({
  acc_email: emailSchema,
  password: requiredString("password").min(6, "password must have at least 6 characters"),
});

export const signUpCustomerSchema = z.object({
  acc_email: emailSchema,
  password: requiredString("password").min(6, "password must have at least 6 characters"),
  cus_name: requiredString("cus_name"),
  cus_address: requiredString("cus_address"),
  cus_phone: requiredString("cus_phone"),
  cus_birthday: requiredString("cus_birthday"),
});

export const signUpStaffSchema = z
  .object({
    acc_email: emailSchema,
    password: requiredString("password").min(6, "password must have at least 6 characters"),
    comfirmPass: requiredString("comfirmPass"),
    staff_name: requiredString("staff_name"),
    staff_phone: requiredString("staff_phone"),
  })
  .refine((data) => data.password === data.comfirmPass, {
    message: "Password confirmation does not match",
    path: ["comfirmPass"],
  });
