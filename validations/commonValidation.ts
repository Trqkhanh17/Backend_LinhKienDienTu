import { z } from "zod";

export const requiredString = (field: string) =>
  z.string().trim().min(1, `${field} is required`);

export const emailSchema = z.string().trim().email("Email is invalid");

export const positiveIntSchema = (field: string) =>
  z.coerce.number().int(`${field} must be an integer`).positive(`${field} must be greater than 0`);

export const positiveNumberSchema = (field: string) =>
  z.coerce.number().positive(`${field} must be greater than 0`);

export const numericIdParam = (field: string) =>
  z.object({
    [field]: z.string().regex(/^\d+$/, `${field} must be a numeric id`),
  });

export const searchBodySchema = (field: string) =>
  z.object({
    [field]: requiredString(field),
  });
