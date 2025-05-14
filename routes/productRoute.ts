import express from 'express';
import { createProduct, deleteProduct, findProduct, getAllProduct, getProductByCategory, getProductById, newProduct, updateProduct } from '../controllers/productController';
import { verifyAdmin, verifyToken} from '../middleware';
import { randomBytes } from 'crypto';
const route = express.Router();
const productRoute = () => {
    route.get('/product/list-all', getAllProduct);
    route.post('/product/create',verifyAdmin, createProduct);
    route.put('/product/update',updateProduct);
    route.put('/product/delete', deleteProduct);
    route.get('/product/find-product', findProduct);
    route.get('/product/productByCate/:cateId', getProductByCategory);
    route.get('/product/new-product', newProduct);
    route.get("/product/:proId", getProductById);

    return route;
};
export default productRoute;

