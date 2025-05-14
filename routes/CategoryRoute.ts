import express, { Router } from "express";
import { createCategory, deleteCategory, findCategory, getAllCategory, getCategoryById, updateCategory } from "../controllers/categotyController";
import { verifyAdmin } from "../middleware";

const route = Router();
const cateroryRoute = () => {
    route.get("/category/list-all", getAllCategory);
    route.post("/category/create",verifyAdmin, createCategory);
    route.put("/category/update",verifyAdmin, updateCategory);
    route.delete("/category/delete",verifyAdmin, deleteCategory);
    route.get("/caterory/find", findCategory);
    route.get("/category/:cateId", getCategoryById);
    return route;
};
export default cateroryRoute;