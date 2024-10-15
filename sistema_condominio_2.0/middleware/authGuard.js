import UserModel from "../models/User.js";
import jwt from 'jsonwebtoken'; 

const jwtSecret = process.env.JWT_SECRET;

export const authGuard = async(req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    //checa se o cabeçalho da requisição tem o token
    if(!token){
        return res.status(401).json({ errors: ['Acesso negado'] });
    }

    //checar se o token é valido
    try {

        const verified = jwt.verify(token, jwtSecret);
        req.user = await UserModel.findById(verified.id).select('-password');

        next();
        
    } catch (error) {
        res.status(404).json({ errors: ['Token invalido'] })
    }
}