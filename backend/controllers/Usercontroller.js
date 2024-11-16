import validator from 'validator'
import bycrypt from 'bcrypt'
import userModel from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';
import razorpay from 'razorpay';
import mongoose from 'mongoose';
import doctorModel from '../models/doctormodel.js';
import appointmentModel from '../models/appointmentModel.js';

// api to register user 

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        // Hashing user password
        const salt = await bycrypt.genSalt(9);
        const hashedPassword = await bycrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    }

    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// API For user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bycrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get user profile data
const getprofile = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log('Received userId:', userId);

        // Validate userId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.json({ success: false, message: 'Invalid or missing userId' });
        }

        // Query database
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, userData });
    } catch (error) {
        console.log('Error fetching user profile:', error);
        res.json({ success: false, message: error.message });
    }
};


// API To book appointment 

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }
        let slots_booked = docData.slots_booked;

        // Checking for slots availability

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            }
            else {
                slots_booked[slotDate].push(slotTime);
            }
        }
        else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Save new slots data in doctors data 
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "Appointment booked" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API To get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments })
    }

    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        // Verify appointment user
        if (appointmentData.userId != userId) {
            return res.json({ success: false, message: 'Unauthorized action' });
        }

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

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})
// API To make payment of appointment using razorpay
const paymentRazorPay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment cancelled or not found" });
        }

        // creating options for razorpay payments 
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creating an order
        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}
// API To update user profile

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        console.log(req.body.userId);
        console.log(req.body.name);
        console.log(req.body.phone);
        console.log(req.body.address);
        // const imageFile = req.file;
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address, dob, gender });

        // if(imageFile){
        //     const imageupload = await cloudinary.uploader.upload(imageFile.path , {resource_type:'image'});
        //     const imageURL = imageupload.secure_url;
        //     await userModel.findByIdAndUpdate(userId , {image: imageURL})
        // }

        res.json({ success: true, message: "Profile updated" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to verify payments of razorpay 

const verifyRazorPay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        if (!razorpay_order_id) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }

        console.log(razorpay_order_id);

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (!orderInfo) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (orderInfo.status === 'paid') {
            const appointment = await appointmentModel.findById(orderInfo.receipt);

            if (!appointment) {
                return res.status(404).json({ success: false, message: "Appointment not found" });
            }

            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            return res.status(200).json({ success: true, message: "Payment successful" });
        } else {
            return res.status(400).json({ success: false, message: "Payment failed, try again" });
        }
    } catch (error) {
        console.log("Error in verifyRazorPay:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, getprofile, updateProfile, bookAppointment, listAppointment, cancelAppointment , paymentRazorPay , verifyRazorPay}