import { Router } from "express";
import { createStock, deleteStock, exportStock, findStock, getAllStock, getStockByProId, updateStock } from "../controllers/stockController";
import { verifyAdmin } from "../middleware";
import { validate } from "../middleware/validate";
import { numericIdParam } from "../validations/commonValidation";
import {
    createStockSchema,
    deleteStockSchema,
    exportStockSchema,
    findStockSchema,
    updateStockSchema,
} from "../validations/stockValidation";


const route = Router();
const stockRoute = () => {
    route.get("/stock/list-all",verifyAdmin, getAllStock);
    route.post("/stock/create",verifyAdmin, validate({ body: createStockSchema }), createStock);
    route.put("/stock/update",verifyAdmin, validate({ body: updateStockSchema }), updateStock);
    route.put("/stock/export", validate({ body: exportStockSchema }), exportStock);    
    route.delete("/stock/delete",verifyAdmin, validate({ body: deleteStockSchema }), deleteStock);
    route.get("/stock/find",verifyAdmin, validate({ query: findStockSchema }), findStock);
    route.get("/stock/getStockByproId/:proId", validate({ params: numericIdParam("proId") }), getStockByProId);
    return route;
};
export default stockRoute;
