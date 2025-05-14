import {initializeApp} from 'firebase/app';             
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {firebaseConfig} from '../config/firebase'
import {Request, Response} from 'express';
import { Router } from "express";
import { realpathSync } from 'fs';
const routeUpload = Router();
initializeApp(firebaseConfig);
const giveCurrentDateTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    return dateTime;
};

const storage = getStorage();

export const uploadSingleFile = async (req: Request, res: Response) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: "No file uploaded or file buffer is empty" });
        }
        
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${req.file.originalname + "    " + dateTime}`);
        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        console.log("checkkkk");
        

        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('file successfully uploaded');
        return res.status(200).json({
            message: 'file successfully uploaded',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL,
        });
    } catch (error) {
        console.log("Upload file error: ", error);
        return res.status(500).json("Internal Server Error");
    }
}
export const uploadMultipleFiles = async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];
        if(!req.files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded or files buffer is empty" });
        }
        const dateTime = giveCurrentDateTime();

        const upload = await Promise.all(
            files.map(async (file) => {
                const storageRef = ref(storage, `files/${file.originalname + " " + dateTime}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                return downloadURL;
            })
        );
        return res.status(200).json({   
            message: "files successfully uploaded",
            downloadURL: upload,
        });
    } catch (error) {
        console.log("Upload file error: ", error);
        return res.status(500).json("Internal Server Error");        
    }
};