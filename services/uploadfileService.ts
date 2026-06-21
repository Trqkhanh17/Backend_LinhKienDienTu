import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "../config/firebase";

initializeApp(firebaseConfig);

const storage = getStorage();

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
};

const uploadSingleFile = async (file: Express.Multer.File) => {
  const dateTime = giveCurrentDateTime();
  const storageRef = ref(storage, `files/${file.originalname + "    " + dateTime}`);
  const metadata = {
    contentType: file.mimetype,
  };

  const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
  return getDownloadURL(snapshot.ref);
};

const uploadMultipleFiles = async (files: Express.Multer.File[]) => {
  const dateTime = giveCurrentDateTime();

  return Promise.all(
    files.map(async (file) => {
      const storageRef = ref(storage, `files/${file.originalname + " " + dateTime}`);
      const metadata = {
        contentType: file.mimetype,
      };
      const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
      return getDownloadURL(snapshot.ref);
    })
  );
};

export default {
  uploadMultipleFiles,
  uploadSingleFile,
};
