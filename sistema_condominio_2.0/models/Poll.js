import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const optionSchema = new Schema({
    optionText : {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const pollSchema = new Schema({
    principal: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    options: [optionSchema],
    votedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expiresAt: {
        type: Date
    }
}, { timestamps: true});

const PollModel = mongoose.model('Poll', pollSchema);
export default PollModel;