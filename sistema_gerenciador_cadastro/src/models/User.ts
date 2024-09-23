import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    area: { 
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;