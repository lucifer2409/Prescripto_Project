import express from 'express'
import { registerUser  , loginUser, getprofile , updateProfile, listAppointment, cancelAppointment, paymentRazorPay, verifyRazorPay} from '../controllers/Usercontroller.js'
import { bookAppointment } from '../controllers/Usercontroller.js';
import authuser from '../middlewares/authUsers.js';

const userRouter = express.Router();
userRouter.post('/register' , registerUser);
userRouter.post('/login' , loginUser);
userRouter.post('/book-appointment', authuser , bookAppointment);
userRouter.get('/appointments', authuser , listAppointment);
userRouter.get('/get-profile' , authuser , getprofile);
userRouter.post('/update-profile', authuser ,updateProfile);
userRouter.post('/cancel-appointment', authuser ,cancelAppointment);
userRouter.post('/payment-razorpay' , authuser , paymentRazorPay);
userRouter.post('/verifyrazorpay' , authuser , verifyRazorPay);
export default userRouter;