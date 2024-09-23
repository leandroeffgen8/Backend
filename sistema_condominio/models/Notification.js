import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sendBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const NotificationModel = mongoose.model('Notification', notificationSchema);
export default NotificationModel;