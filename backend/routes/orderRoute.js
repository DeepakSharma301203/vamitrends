import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyRazorpay} from '../controllers/orderController.js'
import authUser from '../middleware/Auth.js'

const orderRouter = express.Router();

//Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

//User Features
orderRouter.post('/userorders', authUser, userOrders);


//verify payment
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default orderRouter;