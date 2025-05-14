import { Router } from "express";
import { rootCertificates } from "tls";
import { createOrderDetail, getAlloOrderDetails, getOrderDetailByOrderId, updateOrderDetail } from "../controllers/orderdetailController";

const route = Router();

const orderdetailRoute = () => {
    route.get("/orderDetails", getAlloOrderDetails);
    route.post("/orderDetails/create", createOrderDetail);
    route.put("/orderDetails/update", updateOrderDetail);
    route.get("/orderDetails/:id", getOrderDetailByOrderId);
    return route;
};
export default orderdetailRoute;