import express from "express";
import { findStaff, getAllStaff, getStaffById, updateStaffProfile } from "../controllers/staffController";
import { verifyAdmin } from "../middleware";
import { validate } from "../middleware/validate";
import { numericIdParam } from "../validations/commonValidation";
import { findStaffSchema, updateStaffProfileSchema } from "../validations/staffValidation";
const route = express.Router();

const staffRoute = () => {
  route.get("/staff/list-all", getAllStaff);
  route.put("/staff/update-profile",verifyAdmin, validate({ body: updateStaffProfileSchema }), updateStaffProfile);
  route.get("/staff/find-staff",verifyAdmin, validate({ query: findStaffSchema }), findStaff);
  route.get("/staff/:staffId", validate({ params: numericIdParam("staffId") }), getStaffById);
  return route;
};

export default staffRoute;
