import express from 'express'
import { addDoctor , allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin , adminDashboard} from '../controllers/adminController.js'
import authadmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';
changeAvailability

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authadmin, addDoctor);

adminRouter.post('/login' , loginAdmin);
adminRouter.post('/all-doctors' , authadmin , allDoctors);
adminRouter.post('/change-availability' , authadmin , changeAvailability);
adminRouter.get('/appointments' , authadmin , appointmentsAdmin);
adminRouter.post('/cancel-appointment' , authadmin , appointmentCancel);
adminRouter.get('/dashboard' , authadmin , adminDashboard);
export default adminRouter
