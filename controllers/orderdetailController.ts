import { RowDataPacket } from "mysql2";
import connection from "../config/database";
import { Request, Response } from "express";
import { realpathSync, stat } from "fs";
export const getAlloOrderDetails = async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Order_Details");
        if (results.length === 0) {
            return res.status(404).json({ message: "No order details found" ,statuscode:404});
        }
        return res.status(200).json({ data: results, statuscode: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createOrderDetail = async (req: Request, res: Response) => {
    try {
        const {order_id,pro_id,detail_price,detail_quantity} = req.body;
        if (!order_id || !pro_id || !detail_price || !detail_quantity) {
            return res.status(200).json({ message: "Please provide all fields" ,statuscode:400});
        }  
        await connection.execute("INSERT INTO Order_Details (order_id,pro_id,detail_price,detail_quantity) VALUES (?,?,?,?)", [order_id,pro_id,detail_price,detail_quantity]);
        return res.status(200).json({ message: "Order detail created successfully", statuscode: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:error });  
    }
};

export const getOrderDetailById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Order_Details WHERE detail_id = ?", [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: "Order detail not found", statuscode: 404 });
        }
        return res.status(200).json({ data: results[0], statuscode: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getOrderDetailByOrderId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Order_Details WHERE order_id = ?", [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: "Order detail not found",statuscode:404 });
        }
        return res.status(200).json({data: results, statuscode: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }   
};

export const updateOrderDetail = async (req: Request, res: Response) => {
    try {
        const {detail_id,order_id,pro_id,detail_price,detail_quantity} = req.body;
        if (!detail_id||!order_id || !pro_id || !detail_price || !detail_quantity) {
            return res.status(400).json({ message: "Please provide all fields" });
        }
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Order_Details WHERE detail_id = ?", [detail_id]);
        if (results.length === 0) {
            return res.status(404).json({ message: "Order detail not found", statuscode: 404 });
        }
        await connection.execute("UPDATE Order_Details SET order_id = ?,pro_id = ?,detail_price = ?,detail_quantity = ? WHERE detail_id = ?", [order_id,pro_id,detail_price,detail_quantity,detail_id]);
        return res.status(200).json({ message: "Order detail updated successfully", statuscode: 200 }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
