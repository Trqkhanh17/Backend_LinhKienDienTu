import express from "express";
import categoryService from "../services/categoryService";

export const getAllCategory = async (req: express.Request, res: express.Response) => {
    try{
        const result = await categoryService.getAllCategory();
        return res.status(200).json(result);
    }
    catch(error){
        console.log("Get all category error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const createCategory = async (req: express.Request, res: express.Response) => {
    try{
        const {cate_name} = req.body;
        const result = await categoryService.createCategory(cate_name);
        return res.status(result.statusCode === 400 ? 400 : 200).json(result);
    }
    catch(error){
        console.log("Create category error: ", error);
        return res.status(500).json("Internal Server Error");
    }   
};
export const updateCategory = async (req: express.Request, res: express.Response) => {
    try {
        const {cate_id, cate_name} = req.body;
        const result = await categoryService.updateCategory(cate_id, cate_name);
        return res.status(result.statusCode === 400 ? 400 : 200).json(result);
    } catch (error) {
        console.log("Update category error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const deleteCategory = async (req: express.Request, res: express.Response) => {
    try{
        const {cate_id} = req.body;
        const result = await categoryService.deleteCategory(cate_id);
        return res.status(result.statusCode === 400 ? 400 : 200).json(result);
    }
    catch(error){
        console.log("Delete category error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const findCategory = async (req: express.Request, res: express.Response) => {
    try {
        const { cate_name} = req.body;
        const result = await categoryService.findCategory(cate_name);
        return res.status(result.statusCode === 400 ? 400 : 200).json(result);
    } catch (error) {
        console.log("Find category error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const getCategoryById = async (req: express.Request, res: express.Response) => {
    try {
        const { cateId } = req.params;
        const result = await categoryService.getCategoryById(cateId);
        return res.status(result.statusCode === 400 ? 400 : 200).json(result);
    } catch (error) {
        console.log("Get category by id error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
