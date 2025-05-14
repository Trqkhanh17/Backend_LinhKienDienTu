import express from 'express';
import connection from '../config/database';
import { RowDataPacket } from 'mysql2';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import "dotenv/config";
export const getAllCustomer = async (req:Request, res:Response) => {
    try{
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Customer");
        if(result.length === 0){
            return res.status(200).json({message: "List Customer Empty", statusCode: 404});

        }
        return res.status(200).json({data: result, statusCode: 200});
    }
    catch(error){
        console.log("Get all customer error: ", error);
        return res.status(500).json("Internal Server Error");
    }
}
export const updateCustomer = async (req:Request, res:Response) => {
    try {
    const { cus_email,cus_name,cus_address,cus_birthday,cus_phone,cus_avatar } = req.body;
    if (!cus_email||!cus_name || !cus_address || !cus_birthday || !cus_phone||!cus_avatar) {
            return res.status(400).json({ message: "Email,Name, Address, Birthday, Phone is Require!!", statusCode: 400 });
    }
    console.log(req.body);
    
    const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Customer WHERE cus_email = ?", [cus_email]);
    if (result.length === 0) {
        return res.status(200).json({ message: "Customer not found", statusCode: 404 });
    }
    const birthday = new Date(cus_birthday);
    const cus_update = new Date();
    await connection.execute<RowDataPacket[]>("UPDATE Customer SET cus_name = ?, cus_address = ?, cus_birthday = ?, cus_phone = ?, cus_update = ?, cus_avatar = ? WHERE cus_email = ?", 
        [cus_name, cus_address, birthday, cus_phone, cus_update,cus_avatar, cus_email]);
    return res.status(200).json({ message: "Update Customer Success", statusCode: 200 });
    } catch (error) {
        console.log("Banned Account Error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const findCustomer = async (req:Request, res: Response) => {
    try {
        const { inforFind } = req.body;
        if (!inforFind) {
            return res.status(400).json({ message: "Information Find is Require!!", statusCode: 400 });
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Customer where cus_email LIKE ? OR cus_name LIKE ? OR cus_address LIKE ? OR cus_phone LIKE ?",
            [`${inforFind}%`, `${inforFind}%`, `${inforFind}%`, `${inforFind}%`]);
        if (result.length === 0) {
            return res.status(200).json({ message: "Customer not found", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Find Customer Error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const getProfileCustomerByEmail = async (req: Request, res: Response) => {
   try {
    const auth = req.header("Authorization");
    const token = auth ? auth.split(" ")[1] : "";
    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY ? process.env.JWT_KEY : ""
    ) as JwtPayload;
    const email = decoded ? decoded.email : "";
    if (!email) {
      return res.status(400).json({ message: "Email is Require!!", statusCode: 400 });
    }
    const [result]=await connection.query<RowDataPacket[]>(
      "SELECT * FROM Customer where cus_email = ?",
      [email]
    );
    if(result.length === 0){
      return res.status(200).json({message: "Customer not found", statusCode: 404});
    }
    const customerProfile = result[0];
    return res.status(200).json({ message: customerProfile, statusCode: 200 });
   } catch (error) {
     console.log("Get Profile Error: ", error);
     return res.status(500).json("Internal Server Error");
   }
};