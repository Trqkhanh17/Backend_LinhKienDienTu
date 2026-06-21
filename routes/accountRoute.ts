import express, { Router } from "express";
import { banndedCustomer, changePassword, findAccount, getAllAccount,getProfileAccountByEmail,unBannedCustomer, } from "../controllers/accountController";
import { verifyAdmin, verifyToken } from "../middleware";
import { validate } from "../middleware/validate";
import { accountEmailSchema, changePasswordSchema } from "../validations/accountValidation";
const route = Router();

const accountRoute = () => {
  route.get("/account/list-all",verifyAdmin, getAllAccount);
  route.put("/account/ban-account",verifyAdmin, validate({ body: accountEmailSchema }), banndedCustomer);
  route.put("/account/unban-account",verifyAdmin, validate({ body: accountEmailSchema }), unBannedCustomer);
  route.get("/account/find-by-email",verifyAdmin, validate({ query: accountEmailSchema }), findAccount);
  route.put("/account/change-password",verifyToken, validate({ body: changePasswordSchema }), changePassword);
  route.get("/account/getaccount-by-email",verifyAdmin, validate({ query: accountEmailSchema }), getProfileAccountByEmail);
  return route;
};

export default accountRoute;
