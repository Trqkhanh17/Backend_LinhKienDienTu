import { Router } from "express";
import { getDailyStats, getMonthlyStats, getOverallStats, getYearlyStats } from "../controllers/analytisController";

const route = Router();
const analytisRoute = () => {
    route.get("/stats-overall", getOverallStats);
    route.post("/stats-daily", getDailyStats);
    route.get("/stats-monthly", getMonthlyStats);
    route.get("/stats-yearly", getYearlyStats);
    return route;
}
export default analytisRoute;