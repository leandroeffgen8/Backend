import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const assemblySchema = new Schema({
    local: {
        type: String,
        required: true
    },
    dayOf: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }     
}, { timestamps: true });

const AssemblyModel = mongoose.model('assembly', assemblySchema);
export default AssemblyModel;