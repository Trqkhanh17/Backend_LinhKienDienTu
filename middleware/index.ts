import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.header("Authorization");
        const token = auth ? auth.split(" ")[1] : "";
        console.log("check",token)
        
        const decoded = jwt.verify(token, process.env.JWT_KEY ? process.env.JWT_KEY : "") as JwtPayload;
      
        if (!decoded) {
            return res.status(401).json({ message: "Token is invalid", statusCode: 401 });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid", statusCode: 401 });
    }
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.header("Authorization");
        const token = auth ? auth.split(" ")[1] : "";
        const decoded = jwt.verify(token, process.env.JWT_KEY ? process.env.JWT_KEY : "") as JwtPayload;

        if (decoded.role && parseInt(decoded.role as string, 10) === 1) {
            next();
        } else {
            return res.status(403).json({ message: "You are not admin", statusCode: 403 });
        }
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid", statusCode: 401 });
    }
};
export const verifyCustomer = (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.header("Authorization");
        const token = auth ? auth.split(" ")[1] : "";
        const decoded = jwt.verify(token, process.env.JWT_KEY ? process.env.JWT_KEY : "") as JwtPayload;
        console.log(decoded.role);
        
        if (decoded.role && parseInt(decoded.role as string, 10) === 0) {
            next();
        } else {
            return res.status(403).json({ message: "You are not customer", statusCode: 403 });
        }
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid", statusCode: 401 });
    }
}