import { Request, Response } from "express";
import mailService from "../services/mailService";
import { sendServiceResponse } from "../utils/controllerResponse";

export const sendMailAuth = async (req: Request, res: Response) => {
    try {
        const { email, subject, htmlContent } = req.body;
        return sendServiceResponse(res, await mailService.sendMailMessage(email, subject, htmlContent));
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
        return sendServiceResponse(res, await mailService.sendMailMessage(email, subject, htmlContent));
    } catch (error) {
        console.error("Send Mail Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            statusCode: 500,
        });
    }
};
