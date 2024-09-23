import NotificationModel from '../models/Notification.js';


//CRIA UMA NOTIFICAÇÃO
export const createNotification = async(req, res) => {
    //return res.send('Cria uma notificação')

    try {
        
        const { title, message } = req.body;
        const notification = await NotificationModel({
            title,
            message,
            sendBy: req.user._id
        });

        await notification.save();
        return res.status(201).json(notification);

    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

//RETORNA TODAS AS NOTIFICAÇÕES
export const getAllNotification = async(req, res) => {
    //return res.send('Obter todas as notificações')

    try {
        
        const notification = await NotificationModel.find().populate('sendBy', 'name email');
        return res.status(200).json(notification);

    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}