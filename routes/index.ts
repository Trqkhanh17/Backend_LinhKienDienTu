import { Express } from "express";
import accountRoute from "./accountRoute";
import authRoute from "./authRoute";
import staffRoute from "./staffRoute";
import productRoute from "./productRoute";
import cateroryRoute from "./CategoryRoute";
import customerRoute from "./customerRoute";
import galleryRoute from "./galleryRoute";
import stockRoute from "./stockRoute";
import orderRoute from "./orderRoute";
import uploadfileRoute from "./uploadfileRoute";
import orderdetailRoute from "./orderdetailRoute";
import paypalRoute from "./paypalRoute";
import mailRoute from "./mailRoute";
import analytisRoute from "./analytisRoute";
const VERSION_API = "/api/v1";
const initApiRoutes = (app: Express) => {
  app.get("/", (req, res) => {
    return res.status(200).json("Project Linh Kien Dien Tu");
  });

  app.use(VERSION_API, authRoute());
  app.use(VERSION_API, accountRoute());
  app.use(VERSION_API, staffRoute());
  app.use(VERSION_API, productRoute());
  app.use(VERSION_API,cateroryRoute());
  app.use(VERSION_API,customerRoute());
  app.use(VERSION_API,galleryRoute());
  app.use(VERSION_API, stockRoute());
  app.use(VERSION_API, orderRoute());
  app.use(VERSION_API,uploadfileRoute());
  app.use(VERSION_API, orderdetailRoute());
  app.use(VERSION_API, paypalRoute());
  app.use(VERSION_API, mailRoute());
  app.use(VERSION_API, analytisRoute());
  return app;
};

export default initApiRoutes;
