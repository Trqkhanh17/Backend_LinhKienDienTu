import e, { Request, Response } from "express";
import { connect } from "http2";
import connection from "../config/database";
import { RowDataPacket } from "mysql2";
import { sendMail } from "../utils";

export const sendMailAuth = async (req: Request, res: Response) => {
    try {
        const { email, subject, htmlContent } = req.body;

        if (!email || !subject || !htmlContent) {
            return res.status(400).json({
                message: "Email, Subject, and Html Content are required!",
                statusCode: 400,
            });
        }

        // Gửi email
        await sendMail(email, subject, htmlContent);

        return res.status(200).json({
            message: "Mail sent successfully!",
            statusCode: 200,
        });
    } catch (error) {
        console.error("Send Mail Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            statusCode: 500,
        });
    }
};
export const sendMailOrder = async (req: Request, res: Response) => {
    try {
        const { email, subject, htmlContent } = req.body;
        if(!email||!subject||!htmlContent){
            return res.status(400).json({message:"Email, Subject, and Html Content are required!",statusCode:400});
        }
        console.log(email,subject,htmlContent);
        await sendMail(email,subject,htmlContent);
        return res.status(200).json({message:"Mail sent successfully!",statusCode:200});
    } catch (error) {
        console.error("Send Mail Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            statusCode: 500,
        });
    }
};
