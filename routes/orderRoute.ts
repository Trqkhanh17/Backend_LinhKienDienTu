import { Router } from "express";
import { createOrder, deleteOrder, findOrder, getAllOrder, getOrderAndOrderDetailByCustomerId, getOrderByCustomerId, getOrderByOrderId, unDeleteOrder, updateOrder } from "../controllers/orderController";
import { verifyAdmin, verifyToken } from "../middleware";
import { validate } from "../middleware/validate";
import { numericIdParam } from "../validations/commonValidation";
import {
    createOrderSchema,
    orderIdBodySchema,
    updateOrderSchema,
} from "../validations/orderValidation";

const route = Router();
const orderRoute = () => {
    route.get("/order/list-all", getAllOrder);
    route.post("/order/create",verifyToken, validate({ body: createOrderSchema }), createOrder);
    route.put("/order/update", validate({ body: updateOrderSchema }), updateOrder);
    route.put("/order/delete",verifyToken, validate({ body: orderIdBodySchema }), deleteOrder);
    route.put('/order/undelete',verifyAdmin, validate({ body: orderIdBodySchema }), unDeleteOrder);
    route.get("/order/find",verifyAdmin, findOrder);
    //route.get("/order/customer/:cusId", getOrderAndOrderDetailByCustomerId);
    route.get("/order/:cusId", validate({ params: numericIdParam("cusId") }), getOrderAndOrderDetailByCustomerId);
    route.get("/getorderbyid/:orderId", validate({ params: numericIdParam("orderId") }), getOrderByOrderId)
    return route;   
};
export default orderRoute;
