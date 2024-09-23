import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const carSchema = new Schema({
    placa: {
        type: String,
        required: true,
        unique: true
    },
    modelo: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    vagaEstacionamento: {
        type: String, 
        required: true
    },
    moradorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const CarModel = mongoose.model('Car', carSchema);
export default CarModel;