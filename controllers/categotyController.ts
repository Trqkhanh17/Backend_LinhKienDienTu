import express from "express";
import { RowDataPacket } from "mysql2";
import connection from "../config/database";
export const getAllCategory = async (req: express.Request, res: express.Response) => {
    try{
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Category");
        if(result.length === 0){
            return res.status(200).json({message: "List Category Empty", statusCode: 404});
        }
        return res.status(200).json({data: result, statusCode: 200});
    }
    catch(error){
        console.log("Get all category error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const createCategory = async (req: express.Request, res: express.Response) => {
    try{
        const {cate_name} = req.body;
        if(!cate_name){
            return res.status(400).json({message: "Category name is Require!!", statusCode: 400});
        }
        await connection.query("INSERT INTO Category(cate_name) VALUES(?)",[cate_name]);
        return res.status(200).json({message: "Create Category Successfully", statusCode: 200});
    }
    catch(error){
        console.log("Create category error: ", error);
        return res.status(500).json("Internal Server Error");
    }   
};
export const updateCategory = async (req: express.Request, res: express.Response) => {
    try {
        const {cate_id, cate_name} = req.body;
        if (!cate_id || !cate_name) {
            return res.status(400).json({ message: "Category id and name is Require!!" ,statusCode: 400});
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Category WHERE cate_id = ?", [cate_id]);
        if (result.length === 0) {
            return res.status(200).json({ message: "Category not found!", statusCode: 404 });
        }
        await connection.execute("UPDATE Category SET cate_name = ? WHERE cate_id = ?", [cate_name, cate_id]);
        return res.status(200).json({ message: "Update Category Successfully", statusCode: 200 });
    } catch (error) {
        console.log("Update category error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const deleteCategory = async (req: express.Request, res: express.Response) => {
    try{
        const {cate_id} = req.body;
        if(!cate_id){
            return res.status(400).json({message: "Category id is Require!!", statusCode: 400});
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Category WHERE cate_id = ?",[cate_id]);
        if(result.length === 0){
            return res.status(200).json({message: "Category not found!", statusCode: 404});
        }
        await connection.execute("DELETE FROM Category WHERE cate_id = ?",[cate_id]);
        return res.status(200).json({message: "Delete Category Successfully", statusCode: 200});
    }
    catch(error){
        console.log("Delete category error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const findCategory = async (req: express.Request, res: express.Response) => {
    try {
        const { cate_name} = req.body;
        if (!cate_name) {
            return res.status(400).json({ message: "Please provide search information", statusCode: 400 });
        }
       const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Category WHERE cate_name LIKE ?", [`${cate_name}%`]);
       if (result.length === 0) {
           return res.status(200).json({ message: "Category not found!", statusCode: 404 });
       }
         return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Find category error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const getCategoryById = async (req: express.Request, res: express.Response) => {
    try {
        const { cateId } = req.params;
        if (!cateId) {
            return res.status(400).json({ message: "Category id is Require!!", statusCode: 400 });
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Category WHERE cate_id = ?", [cateId]);
        if (result.length === 0) {
            return res.status(200).json({ message: "Category not found!", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Get category by id error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};