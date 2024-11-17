// API for adding doctor 
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/usermodel.js';
import connectDB from '../config/mongodb.js';

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, fees, about, address } = req.body;
        console.log(req.body);
        // checking for all data to add doctor 
        // Log each parameter and its type to inspect the received data
        console.log("Received parameters:");
        console.log("name:", req.body.name, "Type:", typeof req.body.name);
        console.log("email:", req.body.email, "Type:", typeof req.body.email);
        console.log("password:", req.body.password, "Type:", typeof req.body.password);
        console.log("speciality:", req.body.speciality, "Type:", typeof req.body.speciality);
        console.log("degree:", req.body.degree, "Type:", typeof req.body.degree);
        console.log("experience:", req.body.experience, "Type:", typeof req.body.experience);
        console.log("about:", req.body.about, "Type:", typeof req.body.about);
        console.log("fees:", req.body.fees, "Type:", typeof req.body.fees);
        console.log("address:", req.body.address, "Type:", typeof req.body.address);

        // Proceed with the check
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.password ||
            !req.body.speciality ||
            !req.body.degree ||
            !req.body.experience ||
            !req.body.about ||
            !req.body.fees ||
            !req.body.address
        ) {
            return res.json({ success: false, message: "Please fill in required fields " });
        }


        // Validating email for format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        // validating strong password 
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create doctor data object
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address, // Make sure address is valid JSON, or remove JSON.parse if it's not
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        res.json({ success: true, message: 'Doctor added' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API For admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check credentials against environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Include both email and password in the token payload
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
            console.log('Generated Token:', token); // Log the generated token for verification
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for appointment cancellation

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // releasing doctor slot 

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, (slots_booked));

        res.json({ success: true, message: "Appointment cancelled" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
// API to get all doctor lists for admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel

const adminDashboard = async (req , res) => {
    try{
        const doctors = await doctorModel.find({});
        await connectDB();
        const users = await userModel.find({});
        console.log(users);
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length , 
            appointments : appointments.length , 
            patients: users.length , 
            latestAppointments: appointments.reverse().slice(0,5),
        }
        res.json({success:true , dashData});
    }
    catch(error){
        console.log(error);
        res.json({success:false , message: error.message})
    }
}

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin , appointmentCancel , adminDashboard};