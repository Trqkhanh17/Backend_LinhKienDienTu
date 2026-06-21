import express, { Router } from 'express';
import { createGallery, deleteGallery, getAllGallery, getGalleryById, updateGallery } from '../controllers/galleryController';
import { verifyAdmin } from '../middleware';
import { validate } from '../middleware/validate';
import {
    createGallerySchema,
    deleteGallerySchema,
    getGalleryByIdSchema,
    updateGallerySchema,
} from '../validations/galleryValidation';
const route = Router();
const galleryRoute = () => {
    route.get('/gallery/list-all',verifyAdmin, getAllGallery);
    route.post('/gallery/create',verifyAdmin, validate({ body: createGallerySchema }), createGallery);
    route.put('/gallery/update',verifyAdmin, validate({ body: updateGallerySchema }), updateGallery);
    route.delete('/gallery/delete',verifyAdmin, validate({ body: deleteGallerySchema }), deleteGallery);
    //route.get('/gallery/find', findGallery);
    route.get('/gallery/getGalleryById/:galId',verifyAdmin, validate({ params: getGalleryByIdSchema }), getGalleryById);
    return route;
};
export default galleryRoute;
