import { Router } from 'express';
import { createPayment, executePayment } from '../controllers/paypalController';


const router = Router();
const paypalRoute = () => {
router.post('/create-payment', createPayment);
router.get('/execute-payment/:paymentId/:payerId', executePayment);
return router;
};
export default paypalRoute;