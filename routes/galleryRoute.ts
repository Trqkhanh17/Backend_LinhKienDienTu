import express, { Router } from 'express';
import { createGallery, deleteGallery, getAllGallery, getGalleryById, updateGallery } from '../controllers/galleryController';
import { verifyAdmin } from '../middleware';
const route = Router();
const galleryRoute = () => {
    route.get('/gallery/list-all',verifyAdmin, getAllGallery);
    route.post('/gallery/create',verifyAdmin, createGallery);
    route.put('/gallery/update',verifyAdmin, updateGallery);
    route.delete('/gallery/delete',verifyAdmin, deleteGallery);
    //route.get('/gallery/find', findGallery);
    route.get('/gallery/getGalleryById',verifyAdmin, getGalleryById);
    return route;
};
export default galleryRoute;