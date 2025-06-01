import { RowDataPacket } from "mysql2";
import connection from "../config/database";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT * from Staff"
    );
    if (result.length === 0) {
      return res
        .status(200)
        .json({ message: "List staff empty", statusCode: 404 });
    }
    return res.status(200).json({ data: result, statusCode: 200 });
  } catch (error) {
    console.log("Get all staff error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};
export const updateStaffProfile = async (req: Request, res: Response) => {
  try {
    // const auth = req.header("Authorization");
    // const token = auth ? auth.split(" ")[1] : "";
    // const decoded = jwt.verify(
    //   token,
    //   process.env.JWT_KEY ? process.env.JWT_KEY : "") as JwtPayload;
    // const email = decoded ? decoded.email : "";
    const { staff_email,staff_name, staff_phone} = req.body;
    if (!staff_email||!staff_name || !staff_phone) {
      return res
        .status(400)
        .json({ message: "Email, Name and Phone is Require!!", statusCode: 400 });
    }
    await connection.execute(
      "UPDATE Staff SET staff_name = ?, staff_phone = ? WHERE staff_email = ?",
      [staff_name, staff_phone, staff_email]
    );
    res.status(200).json({ message: "Update Profile Successfully", statusCode: 200 });
  } catch (error) {
    console.log("Update Profile Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};
export const findStaff = async (req:Request,res:Response) => {
  try {
    const {inforFind} = req.body;
    if(!inforFind){
      return res.status(400).json({message:"Information Find is Require!!",statusCode:400});
    }
    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM Staff WHERE staff_email LiKE ?% OR staff_name LIKE ?% OR staff_phone LIKE ?",
      [`${inforFind}%`,`${inforFind}%`,`${inforFind}%`] 
    );
    if(result.length === 0){
      return res.status(200).json({message:"Staff not found",statusCode:404});
    }
    return res.status(200).json({data:result,statusCode:200});
  } catch (error) {
    console.log("Find staff error: ", error);
    return res.status(500).json("Internal Server Error");
  }
}
export const getStaffById = async (req:Request,res:Response) => {
 try {
  const {staffId} = req.body;
  if(!staffId){
    return res.status(400).json({message:"Staff ID is Require!!",statusCode:400});
  }
  const [result] = await connection.query<RowDataPacket[]>(
    "SELECT * FROM Staff WHERE staff_id = ?",
    [staffId]
  );
  if(result.length === 0){
    return res.status(200).json({message:"Staff not found",statusCode:404});
  }
  return res.status(200).json({data:result,statusCode:200});
  
 } catch (error) {
   
  return res.status(500).json("Internal Server Error");
 }
};