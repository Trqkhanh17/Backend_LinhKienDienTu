import { RowDataPacket } from "mysql2";
import connection from "../config/database";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { compare, genSalt, hash } from "bcrypt";
import { realpathSync } from "fs";

export const getAllAccount = async (req: Request, res: Response) => {
  try {
    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT * from Account"
    );
    if (result.length === 0) {
      return res
        .status(200)
        .json({ message: "List account empty", statusCode: 404 });
    }
    return res.status(200).json({ data: result, statusCode: 200 });
  } catch (error) {
    console.log("Get all account error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, old_password, new_password, comfirm_password } = req.body;
    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM Account WHERE acc_email = ?",  
      [email]
    );
    if (result.length === 0) {
      return res
        .status(200)
        .json({ message: "Account not found", statusCode: 404 });
    }
    if (!old_password || !new_password || !comfirm_password) {
      return res
        .status(400)
        .json({ message: "Old password or new password or comfirm password is Require!!", statusCode: 400 });
    }
    if(new_password !== comfirm_password){
      return res.status(200).json({ message: "New password and comfirm password is not match", statusCode: 400 });
    }
    console.log();
    const checkPass = await compare(old_password, result[0].password);
    if (checkPass === false) {
      return res
        .status(200)
        .json({ message: "Old password is incorrect!!", statusCode: 401 });
    }
    const salt = await genSalt();

    const hashPass = await hash(new_password, salt);
    await connection.execute<RowDataPacket[]>("UPDATE Account SET password = ? WHERE acc_email = ?", [hashPass, email]);
    return res.status(200).json({ message: "Change password success", statusCode: 200 });
  } catch (error) {
    console.log("Change Password Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const banndedCustomer = async (req: Request, res: Response) => {
  try {
    const { acc_email } = req.body;
    console.log("CheckEmail",acc_email);
    
    const banned = 1;
    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT is_admin FROM Account where acc_email = ?",
      [acc_email]
    );
    if (result.length === 0) {
      console.log(result.length);
      return res
        .status(200)
        .json({ message: "Account not found", statusCode: 404 });
    }
    if (result[0].is_admin === 1) {
      return res
        .status(200)
        .json({ message: "Can't banned staff account", statusCode: 403 });
    }
    await connection.execute<RowDataPacket[]>(
      "UPDATE Customer SET is_banned = ? WHERE cus_email = ?",
      [banned, acc_email]
    );
    return res.status(200).json({ message: "Khóa tài khoản thành công", statusCode: 200 });
  } catch (error) {
    console.log("Banned Account Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const unBannedCustomer = async (req: Request, res: Response) => {
  try {
    const { acc_email } = req.body;
    const unbanned = 0;
    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT is_admin FROM Account where acc_email = ?",
      [acc_email]
    );
    if (result.length === 0) {
      console.log(result.length);
      return res
        .status(200)
        .json({ message: "Không tìm thấy tài khoản", statusCode: 404 });
    }
    if (result[0].is_admin === 1) {
      return res
        .status(200)
        .json({ message: "Không thể khóa tài khoản nhân viên", statusCode: 403 });
    }
    await connection.execute<RowDataPacket[]>(
      "UPDATE Customer SET is_banned = ? WHERE cus_email = ?",
      [unbanned, acc_email]
    );
    return res
      .status(200)
      .json({ message: "Mở khóa tài khoản thành công", statusCode: 200 });
  } catch (error) {
    console.log("Unbanned Account Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const findAccount = async (req: Request, res: Response) => {
  try {
    const { acc_email } = req.body;
    if (!acc_email) {
      return res.status(400).json({ message: "Email is Require!!", statusCode: 400 });
    }
    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM Account where acc_email LIKE ?",
      [`${acc_email}%`]
    );
    if (result.length === 0) {
      return res
        .status(200)
        .json({ message: "Account not found", statusCode: 404 });
    }
    return res.status(200).json({ data: result, statusCode: 200 });
  } catch (error) {
    console.log("Find Account Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};
export const getProfileAccountByEmail = async (req: Request, res: Response) => {
  try {
    const {acc_email} = req.body;
    if (!acc_email) {
      return res.status(400).json({ message: "Email is Require!!", statusCode: 400 });
    }
    const [result]=await connection.query<RowDataPacket[]>(
      "SELECT * FROM Account where acc_email LIKE ?",
      [`${acc_email}%`]
    );
    if(result.length === 0){
      return res.status(200).json({message:"Account not found",statusCode:404});
    }
    return res.status(200).json({data:result,statusCode:200});
  } catch (error) {
    console.log("Get Profile Account Error: ", error);
    res.status(500).json("Internal Server Error");
  }
};
