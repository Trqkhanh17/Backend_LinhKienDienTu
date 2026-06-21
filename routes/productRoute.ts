import express from 'express';
import { createProduct, deleteProduct, findProduct, getAllProduct, getProductByCategory, getProductById, newProduct, updateProduct } from '../controllers/productController';
import { verifyAdmin, verifyToken} from '../middleware';
import { randomBytes } from 'crypto';
import { validate } from '../middleware/validate';
import { numericIdParam } from '../validations/commonValidation';
import {
    createProductSchema,
    deleteProductSchema,
    findProductSchema,
    updateProductSchema,
} from '../validations/productValidation';
const route = express.Router();
const productRoute = () => {
    route.get('/product/list-all', getAllProduct);
    route.post('/product/create',verifyAdmin, validate({ body: createProductSchema }), createProduct);
    route.put('/product/update', validate({ body: updateProductSchema }), updateProduct);
    route.put('/product/delete', validate({ body: deleteProductSchema }), deleteProduct);
    route.get('/product/find-product', validate({ body: findProductSchema }), findProduct);
    route.get('/product/productByCate/:cateId', validate({ params: numericIdParam("cateId") }), getProductByCategory);
    route.get('/product/new-product', newProduct);
    route.get("/product/:proId", validate({ params: numericIdParam("proId") }), getProductById);

    return route;
};
export default productRoute;
