import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const incidentSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['aberto','em processo','resolvido'],
        default: 'aberto'
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const IncidentModel = mongoose.model('Incident', incidentSchema);
export default IncidentModel;