import { Router } from "express";
import { sendMailAuth, sendMailOrder } from "../controllers/sendMailController";

const route = Router();

const mailRoute = () => {
    route.post("/sendMail", sendMailAuth);
    route.post("/sendMailOrder",sendMailOrder);
    return route;
}
export default mailRoute;