import { Request, Response } from "express";
import User from '../models/User';

import bcrypt from 'bcryptjs';

import fs from 'fs';
import path from 'path';
 
// date 
import { parse, format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';


// Registrando usuários
const registerUser = async(req: Request, res: Response) => {

    const { name, email, password, gender, birthDate, photo, area, isAdmin } = req.body;
    //const photo = req.file?.path

    try {
        const user = await User.findOne({ email }); 
        
        // Verifica se o usuário existe.
        if (user) {
            return res.status(400).json({ errors: ['Usuário já existe'] });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const parseDate = parse(birthDate, 'dd/MM/yyyy', new Date(), { locale: ptBR })
        const formatDate = format(parseDate, 'dd/MM/yyyy', {locale: ptBR} );

        const newUser = await User.create({
            name,
            email, 
            password: passwordHash,
            gender,
            birthDate: formatDate,
            area,
            photo: photo,
            isAdmin
        });

        res.status(201).json(newUser);
        console.log('backend', newUser)

    } catch (error) {
        return res.status(422).json({ errors: ['Houve um erro, por favor tente mais tarde.'] });
    }
}

// Atualizando registro do usuário
const updateUser = async(req: Request, res: Response) => {

    try {

        const { name, email, password, gender, birthDate, area, photo, isAdmin } = req.body;
        const userId = req.params.id;
        //const photo = req.file?.path

        // Verifica se o usuário existe.
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ errors: ['Usuário não encontrado.'] });
        } 

        if (photo && user.photo) {
            const oldPhotoPath = path.resolve(user.photo); 
            if (fs.existsSync(oldPhotoPath)) {
                fs.unlinkSync(oldPhotoPath);
            }
        }

        if(birthDate){
            const parsedDate = parse(birthDate, 'dd/MM/yyyy', new Date(), { locale: ptBR });
            const formatDate = format(parsedDate, 'dd/MM/yyyy', {locale: ptBR} );
            user.birthDate = formatDate;
        }

        if(password){
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            user.password = passwordHash;
        }

        if(name){
            user.name = name;
        }

        if(email){
            user.email = email;
        }

        if(gender){
            user.gender = gender;
        }

        if(area){
            user.area = area;
        }

        if(photo){
            user.photo = photo;
        }

        if(isAdmin){
            user.isAdmin = isAdmin;
        }

        await user.save()
        return res.status(200).json(user)
  
    } catch (error) {
        res.status(404).json({ errors: ['Usuário não encontrado.'] })
    }

}

// Deletando registro do usuário.
const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params;

    try {
        
        // Verifica se o usuário existe.
        const user = await User.findById(id);
        if(!user){
            return res.status(422).json({ errors: ['Usuário não encontrado.'] });
        }

        // Verificar e deletar a imagem associada
        if (user.photo) {
            const photoPath = path.resolve(user.photo); // Resolver caminho absoluto
            if (fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath); // Deletar o arquivo
            }
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
        
    } catch (error) {
        return res.status(422).json({ erros: ['Usuário não encontrado.'] })
    }
}

export{ 
    registerUser,
    updateUser,
    deleteUser
}