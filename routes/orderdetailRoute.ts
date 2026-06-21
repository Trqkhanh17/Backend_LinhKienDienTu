import { Router } from "express";
import { rootCertificates } from "tls";
import { createOrderDetail, getAlloOrderDetails, getOrderDetailByOrderId, updateOrderDetail } from "../controllers/orderdetailController";
import { validate } from "../middleware/validate";
import { numericIdParam } from "../validations/commonValidation";
import {
    createOrderDetailSchema,
    updateOrderDetailSchema,
} from "../validations/orderDetailValidation";

const route = Router();

const orderdetailRoute = () => {
    route.get("/orderDetails", getAlloOrderDetails);
    route.post("/orderDetails/create", validate({ body: createOrderDetailSchema }), createOrderDetail);
    route.put("/orderDetails/update", validate({ body: updateOrderDetailSchema }), updateOrderDetail);
    route.get("/orderDetails/:id", validate({ params: numericIdParam("id") }), getOrderDetailByOrderId);
    return route;
};
export default orderdetailRoute;
