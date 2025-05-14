import { Express } from "express";
import connection from "../config/database";
import { runInThisContext } from "vm";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import "dotenv/config";
import { text } from "stream/consumers";
export const checkEmail = async (email: string) => {
    try {
        const [result] = await connection.execute<RowDataPacket[]>("SELECT *FROM Account WHERE acc_email = ?", [email]);
        console.log(result);
        
        if (result.length === 0) {
            return null;
        }
        return result;
    } catch (error) {
        return null;
    }
}
export const verifyEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const verifyPhoneNumber = (phone: string) => {
    const regex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
    return regex.test(phone);
};
export const isValidName = (name: string): boolean =>{
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  }
const maxAge = 3 * 24 * 60 * 60 * 1000;
export const createToken = (email: string, role: number) => {
    return jwt.sign(
      { email, role },
      process.env.JWT_KEY ? process.env.JWT_KEY : "",
      {
        expiresIn: maxAge,
      }
    );
  };

export const sendMail = async (to: string, subject: string, htmlContent: string) => {
      try {
          const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com", // Sử dụng ethereal.email để test
              port: 587,
              secure: false, // false cho port 587
              auth: {
                  user: process.env.EMAIL, // Email từ biến môi trường
                  pass: process.env.EMAIL_PASSWORD, // Password từ biến môi trường
              },
          });
  
          const mailOptions = {
              from: process.env.EMAIL, // Email gửi đi
              to: to, // Email nhận
              subject: subject, // Chủ đề
              html: htmlContent, // Nội dung HTML
          };
  
          await transporter.sendMail(mailOptions);
          console.log("Mail sent successfully!");
      } catch (error) {
          console.error("Error sending mail:", error);
          throw error;
      }
  };
  