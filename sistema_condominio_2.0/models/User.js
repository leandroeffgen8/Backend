import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String      
    },
    phone: {
        type: String
    },
    profileImage: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin','morador'],
        default: 'morador'
    },
    tower: {
        type: String
    },
    apto: {
        type: Number,
        required: true
    }
}, { timestamps: true});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
