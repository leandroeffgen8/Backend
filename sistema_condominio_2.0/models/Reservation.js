import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const reservationSchema = new Schema({
    area:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: { 
        type: String,
        required: true
    },
    reservedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['confirmado','cancelado'],
        default: 'confirmado'
    }
}, {timestamps: true });

const ReservationModel = mongoose.model('Reservation', reservationSchema);
export default ReservationModel;