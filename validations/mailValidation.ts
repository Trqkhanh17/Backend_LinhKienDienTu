import { z } from "zod";
import { emailSchema, requiredString } from "./commonValidation";

export const sendMailSchema = z.object({
  email: emailSchema,
  subject: requiredString("subject"),
  htmlContent: requiredString("htmlContent"),
});
