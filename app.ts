import express, { Request, NextFunction, Response } from "express";
import path from "path";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "dotenv/config";
import initApiRoutes from "./routes";
import session from "express-session";
import cors from "cors";


const app = express();

//Setup CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

//Setup Config
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Setup session
app.use(
  session({
    secret: "!#!@$#%$#%#$%$#@#$@{#@!#!}{!@}{#}",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3 * 24 * 60 * 60 },
  })
);

//Setup Routes
initApiRoutes(app);

app.all("*", (req: Request, res: Response) => {
  return res.status(200).send("API endpoint not found");
});
//Handle Error
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});
app.use((err: any, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
