import express from "express";
//import { login } from "../controllers/authController";
import authController from "../controllers/authController";
import { verifyAdmin, verifyCustomer, verifyToken } from "../middleware";
import { validate } from "../middleware/validate";
import {
  loginSchema,
  signUpCustomerSchema,
  signUpStaffSchema,
} from "../validations/authValidation";
const route = express.Router();

const authRoute = () => {
  route.post("/login", validate({ body: loginSchema }), authController.login);
  route.post(
    "/sign-up-customer",
    validate({ body: signUpCustomerSchema }),
    authController.signUpCustomer
  );
  route.post(
    "/sign-up-staff",
    verifyAdmin,
    validate({ body: signUpStaffSchema }),
    authController.signUpStaff
  );
  route.get("/get-profile",verifyToken, authController.getProfile);
  return route;
};

export default authRoute;
