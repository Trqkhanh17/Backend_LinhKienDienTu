import express from 'express';
import e, { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import connection from '../config/database';

export const getAllGallery = async (req: Request, res: Response) => {
    try {
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Gallery");
        if (result.length === 0) {
            return res.status(200).json({ message: "List Gallery Empty", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    }
    catch (error) {
        console.log("Get all gallery error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};

export const createGallery = async (req: Request, res: Response) => {
    try {
        const { pro_id ,gal_img} = req.body;
        if (!pro_id || !gal_img) {
            return res.status(400).json({ message: "product name and image is Require!!", statusCode: 400 });
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Product WHERE pro_name = ?", [pro_id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Product not found", statusCode: 404 });
        }
        await connection.execute("INSERT INTO Gallery (pro_id, gal_img) VALUES (?, ?)", [pro_id, gal_img]);
        return res.status(201).json({ message: "Create Gallery Success", statusCode: 201 });
    } catch (error) {
        console.log("Create gallery error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};

export const updateGallery = async (req: Request, res: Response) => {
    try {
        const { gal_id, pro_name, gal_img } = req.body;
        if (!gal_id || !pro_name || !gal_img) {
            return res.status(400).json({ message: "Gallery ID, product name and image is Require!!", statusCode: 400 });
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Product WHERE pro_name = ?", [pro_name]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Product not found", statusCode: 404 });
        }
        const pro_id = result[0].pro_id;
        await connection.execute("UPDATE Gallery SET pro_id = ?, gal_img = ? WHERE gal_id = ?", [pro_id, gal_img, gal_id]);
        return res.status(200).json({ message: "Update Gallery Success", statusCode: 200 });
    } catch (error) {
        console.log("Update gallery error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};

export const deleteGallery = async (req: Request, res: Response) => { 
    try {
        const { gal_id } = req.body;
        if (!gal_id) {
            return res.status(400).json({ message: "Gallery ID is Require!!", statusCode: 400 });
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Gallery WHERE gal_id = ?", [gal_id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Gallery not found", statusCode: 404 });
        }
        await connection.execute("DELETE FROM Gallery WHERE gal_id = ?", [gal_id]);
        return res.status(200).json({ message: "Delete Gallery Success", statusCode: 200 });
    } catch (error) {
        console.log("Delete gallery error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};

// export const findGallery = async (req: Request, res: Response) => {
//     try {
//         const { pro_name } = req.body;
//         if (!pro_name) {
//             return res.status(400).json({ message: "Product name is Require!!", statusCode: 400 });
//         }
//         const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Gallery WHERE pro_name LIKE ?",
//              [`${pro_name}%`]);
//         if (result.length === 0) {
//             return res.status(404).json({ message: "Gallery not found", statusCode: 404 });
//         }
//         return res.status(200).json({ data: result, statusCode: 200 });
//     } catch (error) {
//         console.log("Find gallery error: ", error);
//         return res.status(500).json("Internal Server Error");
//     }
// };

export const getGalleryById = async (req: Request, res: Response) => {
    try {
        const { galId } = req.params;
        if (!galId) {
            return res.status(400).json({ message: "Gallery ID is Require!!", statusCode: 400 });
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Gallery WHERE gal_id = ?", [galId]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Gallery not found", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Get gallery by id error: ", error);
        return res.status(500).json("Internal Server Error");
    }
}