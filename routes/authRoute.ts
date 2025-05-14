import express from "express";
//import { login } from "../controllers/authController";
import authController from "../controllers/authController";
import { verifyAdmin, verifyCustomer, verifyToken } from "../middleware";
const route = express.Router();

const authRoute = () => {
  route.post("/login", authController.login);
  route.post("/sign-up-customer", authController.signUpCustomer);
  route.post("/sign-up-staff",verifyAdmin, authController.signUpStaff);
  route.get("/get-profile",verifyToken, authController.getProfile);
  return route;
};

export default authRoute;
