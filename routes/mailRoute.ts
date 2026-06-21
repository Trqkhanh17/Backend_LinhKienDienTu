import { Router } from "express";
import { sendMailAuth, sendMailOrder } from "../controllers/sendMailController";
import { validate } from "../middleware/validate";
import { sendMailSchema } from "../validations/mailValidation";

const route = Router();

const mailRoute = () => {
    route.post("/sendMail", validate({ body: sendMailSchema }), sendMailAuth);
    route.post("/sendMailOrder", validate({ body: sendMailSchema }), sendMailOrder);
    return route;
}
export default mailRoute;
