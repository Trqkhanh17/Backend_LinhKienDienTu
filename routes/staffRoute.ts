import express from "express";
import { findStaff, getAllStaff, getStaffById, updateStaffProfile } from "../controllers/staffController";
import { verifyAdmin } from "../middleware";
const route = express.Router();

const staffRoute = () => {
  route.get("/staff/list-all", getAllStaff);
  route.put("/staff/update-profile",verifyAdmin,updateStaffProfile);
  route.get("/staff/find-staff",verifyAdmin,findStaff);
  route.get("/staff/:staffId",getStaffById);
  return route;
};

export default staffRoute;
