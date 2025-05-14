import express, { Router } from "express";
import { banndedCustomer, changePassword, findAccount, getAllAccount,getProfileAccountByEmail,unBannedCustomer, } from "../controllers/accountController";
import { verifyAdmin, verifyToken } from "../middleware";
const route = Router();

const accountRoute = () => {
  route.get("/account/list-all",verifyAdmin, getAllAccount);
  route.put("/account/ban-account",verifyAdmin,banndedCustomer);
  route.put("/account/unban-account",verifyAdmin,unBannedCustomer);
  route.get("/account/find-by-email",verifyAdmin,findAccount);
  route.put("/account/change-password",verifyToken,changePassword);
  route.get("/account/getaccount-by-email",verifyAdmin,getProfileAccountByEmail);
  return route;
};

export default accountRoute;
