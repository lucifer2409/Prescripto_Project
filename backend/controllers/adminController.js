// API for adding doctor 
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctormodel.js';

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
  return res.json({ success: false, message: "Missing Details" });
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



export { addDoctor, loginAdmin };