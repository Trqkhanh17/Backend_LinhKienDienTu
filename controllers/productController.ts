import { Request, Response } from 'express';
import connection from '../config/database';
import { RowDataPacket } from 'mysql2';
export const getAllProduct = async (req: Request, res: Response) => {
    try {
        const [result] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM Product WHERE is_delete = 0");
        if (result.length === 0) {
            return res.status(200).json({ message: "List Product Emty", statusCode: 404 })
        }
        return res.status(200).json({ data: result, statusCode: 200 })
    } catch (error) {
        console.log("Get all product error: ", error);
        return res.status(500).json("Internal Server Error");
    }
}
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { cate_id,pro_name,pro_img,price,pro_origin,pro_brand,pro_description } = req.body;
        const is_deleted = 0;
        const pro_create = new Date();
        if (!cate_id||!pro_name || !price || !pro_origin || !pro_brand || !pro_description || !pro_img) {
            return res.status(400).json({ message: "Category name, Product name, price, origin, brand, description is Require!!", statusCode: 400 });
        }
        const [result] = await connection.execute(
            "INSERT INTO Product(cate_id,pro_name,pro_img,price,pro_origin,pro_brand,pro_description,pro_create,is_delete) VALUES(?,?,?,?,?,?,?,?,?)",
            [cate_id,pro_name,pro_img,price,pro_origin,pro_brand,pro_description,pro_create,is_deleted]
        );
        const pro_id = (result as any).insertId;
        await connection.execute("INSERT INTO Stock(pro_id) VALUES(?)",[pro_id]);
        return res.status(200).json({ message: "Create Product Successfully", statusCode: 200 });
    } catch (error) {
        console.log("Create product error: ", error);
        return res.status(500).json("Internal Server Error");
        
    }
}
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { pro_id,cate_id,pro_name,price,pro_origin,pro_brand,pro_description } = req.body;
        if (!cate_id || !pro_name || !price || !pro_origin || !pro_brand || !pro_description) {
            return res.status(400).json({ message: "Category name, Product name, price, origin, brand, description is Require!!", statusCode: 400 });
        }
        const pro_update = new Date();
        await connection.execute(
            "UPDATE Product SET cate_id = ?,pro_name = ?,price = ?,pro_origin = ?,pro_brand = ?,pro_description = ?, pro_update = ? WHERE pro_id = ?",
            [cate_id,pro_name,price,pro_origin,pro_brand,pro_description,pro_update,pro_id])
        return res.status(200).json({ message: "Update Product Successfully", statusCode: 200 });
    } catch (error) {
        console.log("Update product error: ", error);
        return res.status(500).json("Internal Server Error");
    }
}
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { pro_id } = req.body;
        const is_deleted = 1;
        if (!pro_id) {
            return res.status(400).json({ message: "Product id is Require!!", statusCode: 400 });
        }
        await connection.execute(
            "UPDATE Product SET is_delete = ? WHERE pro_id = ?",
            [is_deleted,pro_id]);
        return res.status(200).json({ message: "Delete Product Successfully", statusCode: 200 });
    } catch (error) {
        console.log("Delete product error: ", error);
        return res.status(500).json("Internal Server Error");
        
    }
};
export const findProduct = async (req: Request, res: Response) => {
    try {
        const {inforFind} = req.body;
        if (!inforFind) {
            return res.status(400).json({ message: "Please provide search information", statusCode: 400 });
        }
        const [resultCate_id] = await connection.query<RowDataPacket[]>("SELECT cate_id FROM Category WHERE cate_name LIKE ?", [`${inforFind}%`]);
        let cate_id = "";
        if (resultCate_id.length > 0) {
            cate_id = resultCate_id[0].cate_id;
        }
        const [result] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM Product WHERE pro_name LIKE ? OR cate_id = ? OR price = ? OR pro_origin LIKE ? OR pro_brand LIKE ?",
            [`${inforFind}%`, cate_id, inforFind, `${inforFind}%`, `${inforFind}%`]
        );
        if (result.length === 0) {
            return res.status(200).json({ message: "Product Not Found", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Find product error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { proId } = req.params;
        if (!proId) {
            return res.status(400).json({ message: "Product ID is Require!!", statusCode: 400 });
        }
        const [result] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM Product c JOIN Category cate ON c.cate_id = cate.cate_id WHERE c.pro_id = ?",
            [proId]
        );
        if (result.length === 0) {
            return res.status(404).json({ message: "Product not found", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) { 
        console.log("Get product by id error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const getProductByCategory = async (req: Request, res: Response) => {
    try {
        const { cateId } = req.params;
        if (!cateId) {
            return res.status(400).json({ message: "Category ID is Require!!", statusCode: 400 });
        }
        const [result] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM Product WHERE cate_id = ?",
            [cateId]
        );
        if (result.length === 0) {
            return res.status(404).json({ message: "Product not found", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Get product by category error: ", error);
        return res.status(500).json("Internal Server Error");
        
    }
};
export const newProduct = async (req: Request, res: Response) => {
    try {
        const [result] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM Product WHERE is_delete = 0 ORDER BY pro_create DESC LIMIT 6");
        if (result.length === 0) {
            return res.status(200).json({ message: "List Product Emty", statusCode: 404 })
        }
        return res.status(200).json({ data: result, statusCode: 200 })
    } catch (error) {
        console.log("Get all product error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
