import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import adminRouter from './routes/Adminroute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
// app config 
const app = express();
const portNumber = process.env.PORT || 4000;
connectDB();
// Middlewares 

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors());

// api endpoints

app.use('/api/admin' , adminRouter);
// localhost:4000/api/admin 

app.get('/' , (req , res)=> {
  res.send('API WORKING');
})

app.use('/api/doctor' , doctorRouter);
app.use('/api/user' , userRouter);

app.listen(portNumber , ()=> {
  console.log(`Hi Abhishek server has been started, Listening at port : ${portNumber}`)
})