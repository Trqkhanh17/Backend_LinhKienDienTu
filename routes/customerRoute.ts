import express, { Router } from 'express';
import { findCustomer, getAllCustomer, getProfileCustomerByEmail, updateCustomer } from '../controllers/customeController';
import { verifyAdmin, verifyToken } from '../middleware';
import { validate } from '../middleware/validate';
import { findCustomerSchema, updateCustomerSchema } from '../validations/customerValidation';
const router = Router();
const customerRoute = () => {
    router.get('/customer/list-all',verifyAdmin, getAllCustomer);  
    router.get('/customer/profile-by-email',verifyAdmin, getProfileCustomerByEmail);
    router.put('/customer/update',verifyToken, validate({ body: updateCustomerSchema }), updateCustomer);
    router.get('/customer/findCustomer',verifyAdmin, validate({ body: findCustomerSchema }), findCustomer);
    return router;
};
export default customerRoute;
