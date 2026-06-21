import { Router } from "express";
import { getDailyStats, getMonthlyStats, getOverallStats, getYearlyStats } from "../controllers/analytisController";
import { validate } from "../middleware/validate";
import { dailyStatsSchema } from "../validations/analytisValidation";

const route = Router();
const analytisRoute = () => {
    route.get("/stats-overall", getOverallStats);
    route.post("/stats-daily", validate({ body: dailyStatsSchema }), getDailyStats);
    route.get("/stats-monthly", getMonthlyStats);
    route.get("/stats-yearly", getYearlyStats);
    return route;
}
export default analytisRoute;
