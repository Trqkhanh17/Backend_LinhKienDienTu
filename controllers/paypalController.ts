import * as paypal from 'paypal-rest-sdk';
import dotenv from 'dotenv';

const paypalConfig = () => {
  paypal.configure({
    mode: process.env.PAYPAL_MODE || 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID || '',
    client_secret: process.env.PAYPAL_CLIENT_SECRET || '',
  });
};

paypalConfig();

interface PaymentRequest {
  amount: number;
  description: string;
  currency: string;
}

export const createPayment = async (req: any, res: any) => {
  
    try {
      const paymentRequest: PaymentRequest = req.body;
  
      const payment = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        transactions: [
          {
            amount: {
              currency: paymentRequest.currency,
              total: paymentRequest.amount.toString(), // Chuyển số thành chuỗi
            },
            description: paymentRequest.description,
          },
        ],
        redirect_urls: {
          return_url: 'http://localhost:5173/order',
          cancel_url: 'http://localhost:5173/payment',
        },
      };
      const paymentResponse = await new Promise((resolve, reject) => {
        paypal.payment.create(payment, (error, payment) => {
          if (error) return reject(error);
          resolve(payment);
        });
      });
      res.json(paymentResponse);
      
    } catch (error) {
      res.status(500).json({ message: 'Giao dịch thất bại', error });
      console.log('Error: ', error);
      
    }
  };
  

  export const executePayment = async (req: any, res: any) => {
    const paymentId = req.params.paymentId;
    const payerId = req.params.payerId;
  
    try {
      const paymentResponse = await new Promise((resolve, reject) => {
        paypal.payment.execute(paymentId, { payer_id: payerId }, (error: any, payment: any) => {
          if (error) return reject(error);
          resolve(payment);
        });
      });
      res.json({ success: true, message: 'Thanh toán thành công!' });
    } catch (error: any) {
      res.json({ success: false, message: 'Thanh toán thất bại!' });
    }
  };
  