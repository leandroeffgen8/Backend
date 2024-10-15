import UserModel from '../models/User.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Para obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jwtSecret = process.env.JWT_SECRET;

//GERAR TOKEN
const gerenateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: '7d'
    });
}

//CRIA UM USUÁRIO
export const createUser = async (req, res) => {
    try {

        const { name, email, phone, password, role, profileImage, tower, apto } = req.body;

        const user = await UserModel.findOne({ email });
        if(user){
            return res.status(422).json({ errors: ['Por favor, utilize outro e-mail.'] })
        }

        //gerar uma senha aleatoria
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //cria o usuário
        const newUser = await UserModel.create({
            name,
            email,
            phone,
            password: passwordHash,
            role,
            profileImage,
            tower,
            apto
        })

        //verifica se o usuário foi criado.
        if(!newUser){
            return res.status(422).json({ errors: ['Houve um erro, por favor tente mais tarde.'] })
        }

        return res.status(201).json({
            _id: newUser._id,
            token: gerenateToken(newUser._id)
        })
        
    } catch (error) {
        return res.status(422).json({ errors: ['Houve um erro, por favor tente mais tarde!'] });
    }
}

//LOGIN
export const login = async(req, res) => {
    //return res.send('LOGIN')

    try {

        const { email, password } = req.body;

        //checa se o usuário existe
        const user = await UserModel.findOne({ email });
        if(!user) {
            return res.status(404).json({ errors: ['Usuário não encontrado.'] })
        }

        //checa se a senha combina com a do usuário
        if(!await bcrypt.compare(password, user.password)){
            return res.status(422).json({ errors: ['Desculpa, senha invalida'] });
        }

        return res.status(201).json({
            _id: user._id,
            token: gerenateToken(user._id)
        });
        
    } catch (error) {
        return res.status(404).json({ errors: ['Usuário não encontrado.'] })
    }
}

//USUÁRIO LOGADO
export const getCurrentUser = async(req, res) => {
    const user = req.user;
    return res.status(200).json(user);
}

//RECUPERA USUÁRIO POR ID
export const getUserByID = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id).select('-password');
        if(!user){
            return res.status(404).json({ errors: ['Usuário não encontrado'] });
        }

        return res.status(200).json(user);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Usuário não encontrado.'] })
    }
}

//RECUPERA TODOS OS USUÁRIOS
export const getAllUser = async(req, res) => {
    //return res.send('Todos os usuários')
    const users = await UserModel.find().select('-password');
    return res.status(200).json(users);
}

//ATUALIZA OS DADOS DOS USUÁRIOS
export const updateUser = async(req, res) => {
    try {
        
        const { name, email, phone, password, tower } = req.body
        let profileImage = null;

        if(req.file){
            profileImage = req.file.filename;
        }

        const user = await UserModel.findById(req.user._id).select('-password');
        
        if(name){
            user.name = name;
        }

        if(email){
            user.email = email;
        }

        if(phone !== undefined){
            user.phone = phone
        } 

        if(tower){
            user.tower = tower
        } 

        if(password){
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
        }

        if (profileImage) {
            // Remova a imagem antiga, se existir
            if (user.profileImage) {
                const oldImagePath = path.join(__dirname, '../uploads', user.profileImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                } 
            }
            user.profileImage = profileImage; 
        }

        await user.save();
        return res.status(200).json(user);

    } catch (error) {
        return res.status(404).json({ errors: ['Usuário não encontrado.'] })
    }
} 

//DELETAR USUÁRIO
export const deleteUser = async(req, res) => {
    try {

        const { id } = req.params;
        const user = await UserModel.findById(id);

        if(!user) {
            return res.status(422).json({ erros: ['Usuário não encontrado'] })
        }

        await UserModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Usuário removido com sucesso' })
        
    } catch (error) {
        return res.status(404).json({ errors: ['Usuário não encontrado'] })
    }
}