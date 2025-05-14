import { Router } from "express";
import { createStock, deleteStock, exportStock, findStock, getAllStock, getStockByProId, updateStock } from "../controllers/stockController";
import { verifyAdmin } from "../middleware";


const route = Router();
const stockRoute = () => {
    route.get("/stock/list-all",verifyAdmin, getAllStock);
    route.post("/stock/create",verifyAdmin, createStock);
    route.put("/stock/update",verifyAdmin, updateStock);
    route.put("/stock/export", exportStock);    
    route.delete("/stock/delete",verifyAdmin, deleteStock);
    route.get("/stock/find",verifyAdmin, findStock);
    route.get("/stock/getStockByproId/:proId", getStockByProId);
    return route;
};
export default stockRoute;