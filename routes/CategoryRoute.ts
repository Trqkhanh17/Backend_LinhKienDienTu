import express, { Router } from "express";
import { createCategory, deleteCategory, findCategory, getAllCategory, getCategoryById, updateCategory } from "../controllers/categotyController";
import { verifyAdmin } from "../middleware";
import { validate } from "../middleware/validate";
import { numericIdParam } from "../validations/commonValidation";
import {
    createCategorySchema,
    deleteCategorySchema,
    findCategorySchema,
    updateCategorySchema,
} from "../validations/categoryValidation";

const route = Router();
const cateroryRoute = () => {
    route.get("/category/list-all", getAllCategory);
    route.post("/category/create",verifyAdmin, validate({ body: createCategorySchema }), createCategory);
    route.put("/category/update",verifyAdmin, validate({ body: updateCategorySchema }), updateCategory);
    route.delete("/category/delete",verifyAdmin, validate({ body: deleteCategorySchema }), deleteCategory);
    route.get("/category/find", validate({ query: findCategorySchema }), findCategory);
    route.get("/category/:cateId", validate({ params: numericIdParam("cateId") }), getCategoryById);
    return route;
};
export default cateroryRoute;
