import { Router } from "express";
import { createOrder, deleteOrder, findOrder, getAllOrder, getOrderAndOrderDetailByCustomerId, getOrderByCustomerId, getOrderByOrderId, unDeleteOrder, updateOrder } from "../controllers/orderController";
import { verifyAdmin, verifyToken } from "../middleware";

const route = Router();
const orderRoute = () => {
    route.get("/order/list-all", getAllOrder);
    route.post("/order/create",verifyToken, createOrder);
    route.put("/order/update", updateOrder);
    route.put("/order/delete",verifyToken, deleteOrder);
    route.put('/order/undelete',verifyAdmin, unDeleteOrder);
    route.get("/order/find",verifyAdmin, findOrder);
    //route.get("/order/customer/:cusId", getOrderAndOrderDetailByCustomerId);
    route.get("/order/:cusId", getOrderAndOrderDetailByCustomerId);
    route.get("/getorderbyid/:orderId",getOrderByOrderId)
    return route;   
};
export default orderRoute;