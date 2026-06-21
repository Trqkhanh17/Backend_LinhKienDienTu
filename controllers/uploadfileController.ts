import { Request, Response } from "express";
import uploadfileService from "../services/uploadfileService";

export const uploadSingleFile = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file uploaded or file buffer is empty" });
    }

    const downloadURL = await uploadfileService.uploadSingleFile(req.file);

    return res.status(200).json({
      message: "file successfully uploaded",
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL,
    });
  } catch (error) {
    console.log("Upload file error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const uploadMultipleFiles = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!req.files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded or files buffer is empty" });
    }

    const upload = await uploadfileService.uploadMultipleFiles(files);

    return res.status(200).json({
      message: "files successfully uploaded",
      downloadURL: upload,
    });
  } catch (error) {
    console.log("Upload file error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};
