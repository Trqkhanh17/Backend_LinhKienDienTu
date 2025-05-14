import express, { Router } from 'express';
import { findCustomer, getAllCustomer, getProfileCustomerByEmail, updateCustomer } from '../controllers/customeController';
import { verifyAdmin, verifyToken } from '../middleware';
const router = Router();
const customerRoute = () => {
    router.get('/customer/list-all',verifyAdmin, getAllCustomer);  
    router.get('/customer/profile-by-email',verifyAdmin, getProfileCustomerByEmail);
    router.put('/customer/update',verifyToken, updateCustomer);
    router.get('/customer/findCustomer',verifyAdmin, findCustomer);
    return router;
};
export default customerRoute;