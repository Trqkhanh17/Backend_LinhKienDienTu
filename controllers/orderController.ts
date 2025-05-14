import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../config/database";
import { verifyEmail, verifyPhoneNumber } from "../utils";
import { trace } from "console";
export const getAllOrder = async (req: Request, res: Response) => {
    try {
        const [result] = await connection.query<RowDataPacket[]>("SELECT o.*, od.detail_id ,od.pro_id,od.detail_price,od.detail_quantity FROM `Order` o JOIN Order_Details od ON o.order_id = od.order_id WHERE o.is_rejected = 0");
        if (result.length === 0) {
            return res.status(200).json({ message: "List Order Empty", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Get all order error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { cus_id, order_name, order_phone, order_email, order_address, order_note,pay_status } = req.body;
        const staff_id = null;
        const order_status = 0;
        const order_create = new Date();
        const is_rejected = 0;
        if (!cus_id || !order_name || !order_phone || !order_email || !order_address) {
            return res.status(200).json({ message: "Missing field", statusCode: 400 });
        }
        if (!verifyEmail(order_email)) {
            return res.status(200).json({ message: "Email is invalid", statusCode: 400 });
        }
        if (!verifyPhoneNumber(order_phone)) {
            return res.status(200).json({ message: "Phone number is invalid", statusCode: 400 });
        }
        const result = await connection.execute<ResultSetHeader>(
            "INSERT INTO `Order` (cus_id,staff_id,order_name,order_phone,order_email,order_address,order_note,order_status,order_create,pay_status,is_rejected) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [cus_id, staff_id, order_name, order_phone, order_email, order_address, order_note, order_status, order_create, pay_status, is_rejected]
        );

        const order_id = result[0]?.insertId;

        return res.status(200).json({ data: order_id, statusCode: 200 });
    } catch (error) {
        console.log("Create order error: ", error);
        return res.status(500).json(error);
    }
};
export const updateOrder = async (req: Request, res: Response) => {
    try {
      const { order_id, staff_id, order_note, order_status, pay_status } = req.body;
      const order_update = new Date();
  
      if (!order_id || !staff_id || !order_status || !pay_status) {
        return res.status(400).json({ message: "Missing field", statusCode: 400 });
      }
  
      if (order_status < 0 || order_status > 3) {
        return res.status(400).json({ message: "Order status is invalid", statusCode: 400 });
      }
  
      if (pay_status < 0 || pay_status > 1) {
        return res.status(400).json({ message: "Pay status is invalid", statusCode: 400 });
      }
  
      console.log("Update order: ", order_id, staff_id, order_note, order_status, pay_status, order_update);
  
      const [result] = await connection.execute(
        "UPDATE `Order` SET staff_id = ?, order_note = ?, order_status = ?, pay_status = ?, order_update = ? WHERE order_id = ?",
        [staff_id, order_note, order_status, pay_status, order_update, order_id]
      );
      console.log("Update order successfully");
  
      return res.status(200).json({ message: "Update Order Successfully", statusCode: 200 });
    } catch (error) {
      console.log("Update order error: ", error);
      return res.status(500).json({ message: "Internal Server Error", statusCode: 500 });
    }
  };
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { order_id } = req.body;
        if (!order_id) {
            return res.status(200).json({ message: "Missing field", statusCode: 400 });
        }
        await connection.execute<RowDataPacket[]>(
            "UPDATE `Order` SET is_rejected = 1 WHERE order_id = ?",
            [order_id]
        );
        return res.status(200).json({ message: "Delete Order Successfully", statusCode: 200 });
    } catch (error) {
        console.log("Delete order error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const unDeleteOrder = async (req: Request, res: Response) => {
    try {
        const { order_id } = req.body;
        if (!order_id) {
            return res.status(200).json({ message: "Missing field", statusCode: 400 });
        }
        await connection.execute<RowDataPacket[]>(
            "UPDATE `Order` SET is_rejected = 0 WHERE order_id = ?",
            [order_id]
        );
        return res.status(200).json({ message: "UnDelete Order Successfully", statusCode: 200 });
    } catch (error) {
        console.log("UnDelete order error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const findOrder = async (req: Request, res: Response) => {
    try {
        const { inforFind } = req.body;
        if (!findOrder) {
            return res.status(200).json({ message: "Missing field", statusCode: 400 });
        }

    } catch (error) {
        console.log("Find order error: ", error);
        return res.status(500).json("Internal Server Error");

    }
};
export const getOrderByCustomerId = async (req: Request, res: Response) => {
    try {
        const { cusId } = req.params;
        if (!cusId) {
            return res.status(200).json({ message: "Missing field", statusCode: 400 });
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM `Order` WHERE cus_id = ? AND is_rejected = 0", [cusId]);
        if (result.length === 0) {
            return res.status(200).json({ message: "List Order Empty", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Get order by customer id error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const getOrderAndOrderDetailByCustomerId = async (req: Request, res: Response) => {
    try {
        const { cusId } = req.params;
        
        if (!cusId) {
            return res.status(200).json({ message: "Missing field", statusCode: 400 });
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT o.order_id,o.cus_id,o.staff_id,o.order_name,o.order_phone,o.order_email,o.order_address,o.order_status,o.order_note,o.order_create,o.order_update,o.pay_status,o.is_rejected,od.detail_id,od.pro_id,od.detail_price,od.detail_quantity,p.pro_name,p.pro_img FROM `Order` o JOIN Order_Details od ON o.order_id = od.order_id JOIN Product p ON od.pro_id = p.pro_id WHERE o.cus_id = ?", [cusId]);
        if (result.length === 0) {
            return res.status(200).json({ message: "List Order Empty", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
        
        
    } catch (error) {
        console.log("Get order and order detail error: ", error);
        return res.status(500).json(error);
    }
};
export const getOrderByOrderId = async(req:Request, res:Response) => {
    try {
        const {orderId} = req.params;
        if (!orderId) {
            return res.status(200).json({message:"Missing field",statusCode:400});
        }
       const [result] = await connection.query<RowDataPacket[]>("SELECT *FROM `Order` WHERE order_id = ?",[orderId]);
        return res.status(200).json({data:result,message:"Get Order Successfuly!!",statusCode:200});
    } catch (error) {
        return res.status(500).json(error)
    }
}