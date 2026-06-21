import { Request, Response } from "express";
import galleryService from "../services/galleryService";
import { sendServiceResponse } from "../utils/controllerResponse";

export const getAllGallery = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await galleryService.getAllGallery());
  } catch (error) {
    console.log("Get all gallery error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const createGallery = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await galleryService.createGallery(req.body));
  } catch (error) {
    console.log("Create gallery error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const updateGallery = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(res, await galleryService.updateGallery(req.body));
  } catch (error) {
    console.log("Update gallery error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const deleteGallery = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await galleryService.deleteGallery(req.body.gal_id)
    );
  } catch (error) {
    console.log("Delete gallery error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getGalleryById = async (req: Request, res: Response) => {
  try {
    return sendServiceResponse(
      res,
      await galleryService.getGalleryById(req.params.galId)
    );
  } catch (error) {
    console.log("Get gallery by id error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};
