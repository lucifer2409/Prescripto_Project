import express from 'express'
import { addDoctor , loginAdmin } from '../controllers/adminController.js'
import authadmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authadmin, addDoctor);

adminRouter.post('/login' , loginAdmin)

export default adminRouter