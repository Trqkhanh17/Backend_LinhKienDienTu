import { z } from "zod";
import { positiveIntSchema, requiredString } from "./commonValidation";

export const createGallerySchema = z.object({
  pro_id: z.union([
    z.coerce.number().int().positive(),
    requiredString("pro_id"),
  ]),
  gal_img: requiredString("gal_img"),
});

export const updateGallerySchema = z.object({
  gal_id: positiveIntSchema("gal_id"),
  pro_name: requiredString("pro_name"),
  gal_img: requiredString("gal_img"),
});

export const deleteGallerySchema = z.object({
  gal_id: positiveIntSchema("gal_id"),
});

export const getGalleryByIdSchema = z.object({
  galId: positiveIntSchema("galId"),
});
