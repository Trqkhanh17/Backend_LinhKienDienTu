import { Express, Router } from "express";
import { uploadMultipleFiles, uploadSingleFile } from "../controllers/uploadfileController";
import multer from "multer";
import { verifyToken } from "../middleware";
const route = Router();
export const upload = multer({ storage: multer.memoryStorage() });
const uploadfileRoute = () => {
    route.post("/uploadfile", upload.single("file"), uploadSingleFile);
    route.post("/uploadfiles",verifyToken, upload.array("files", 6), uploadMultipleFiles);
    return route;
};
export default uploadfileRoute;