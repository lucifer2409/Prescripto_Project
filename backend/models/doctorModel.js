import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    speciality: { type: String},
    degree: { type: String},
    experience: { type: String},
    about: { type: String },
    available: { type: Boolean, default:true},
    fees: { type: Number, required: true },
    address: { type: String, required: true },
    date: { type: Date, default: Date.now },
    slots_booked: { type: Object, default: {} }
}, { minimize: false })

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorModel;