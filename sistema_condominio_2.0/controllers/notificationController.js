import NotificationModel from '../models/Notification.js';


//CRIA UMA NOTIFICAÇÃO
export const createNotification = async(req, res) => {
    try {
        
        const { title, message } = req.body;
        const newNotification = new NotificationModel({
            title,
            message,
            sendBy: req.user._id
        });

        await newNotification.save();
        return res.status(201).json(newNotification);

    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

//RETORNA TODAS AS NOTIFICAÇÕES
export const getAllNotification = async(req, res) => {
    try {
        
        const notification = await NotificationModel.find().populate('sendBy', 'name email');
        return res.status(200).json(notification);

    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

//ATUALIZA NOTIFICAÇÃO
export const updateNotification = async(req, res) => {
    try {

        const { title, message } = req.body;
        const notification = await NotificationModel.findById(req.params.id);

        if(title){
            notification.title = title;
        }

        if(message){
            notification.message = message;
        }

        await notification.save();
        return res.status(200).json(notification);
         
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

//DELETE NOTIFICAÇÃO
export const deleteNotification = async(req, res) => {
    try {

        const { id } = req.params;
        const notification = await NotificationModel.findById(id);

        if(!notification){
            return res.status(404).json({ errors: ['Notificação não encontrada'] })
        }

        await NotificationModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Notificação deletada com sucesso' })
        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}