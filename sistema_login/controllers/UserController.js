const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const jwSecret = process.env.JWT_SECRET;

//GERA TOKEN
const generateToken = (id) => {
    return jwt.sign( {id}, jwSecret,{
        expiresIn: '7d'
    } )
}

// Registrar usuário
const register = async (req, res) => {
    
    //res.send('Registrou')

    const { name, email, password } = req.body;

    //Chega se o usuário existe
    const user = await User.findOne({ email });
    if(user){
        res.status(422).json({ errors: ['Por favor, utilize outro e-mail!']})
        return;
    } 

    //Gera uma senha aleatoria
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt);

    //Cria usuário
    const newUser = await User.create({
        name,
        email,
        password: passwordHash 
    });

    //Verifica se o usuario foi criado
    if(!newUser){
        res.status(422).json({ errors: ['Houve um erro, por favor tente mais tarde!']})
        return;
    }

    res.status(200).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })

}

// Valida login do usuário
const login = async(req, res) => {

    //res.send('Logando...')

    const { email, password } = req.body;

    const user = await User.findOne({ email })

    // Chega se o usuário existe
    if(!user){
        res.status(404).json({ errors: ['Usuário não encontrado.'] })
        return;
    }

    // Checa se a senha combina com a do usuário.
    if( ! await bcrypt.compare(password, user.password)){
        res.status(422).json({ errors: ['Desculpe, Senha inválida.'] })
    }

    res.status(201).json({
        _id: user._id,
        token: generateToken(user._id)
    });
}

// Recupera os dados do usuário.
const getCurrentUser = async(req, res) => {

    //res.send('Recuperando dados')

    const user = req.user;
    res.status(200).json(user)

}

// Atualiza dados do usuário
const updateUser = async(req, res) => {

    //res.send('Atualizando dados do usuario')

    const { name, password } = req.body;

    const reqUser = req.user;
    const user = await User.findById(reqUser._id).select('-password');

    // console.log('reqUser', reqUser);
    // console.log('user', user)

    if(name){
        user.name = name;
    }

    if(password){
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash;
    }

    //Salva no banco
    await user.save();

    res.status(200).json(user);

}

// Recupera usuário por ID
const getUserById = async(req, res) => {

    //res.send('Recuperando usuario por ID')

    const { id } = req.params;

    try {

        const user = await User.findById(id).select('-password');

        if(!user){
            res.status(404).json({ errors: ['Usuário não encontrado.'] })
            return;
        }

        res.status(200).json(user);
        
    } catch (error) {
        res.status(404).json({ errors: ['Usuário não encontrado.'] })
        return;
    }
}

// Recupera todos os usuários
const getAllUser = async(req, res) => {
    //res.send('Recuperando todos os usuarios');
    const users = await User.find().select('-password');
    res.status(200).json(users);
}

// Deletando usuário
const deleteUser = async(req, res) => {

    //res.send('Deletando usuário.')

    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if(!user){
            res.status(422).json({ errors: ['Usuário não encontrado.'] })
            return;
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Usuário removido com sucesso!' });

    } catch (error) {
        res.status(422).json({ errors: ['Usuário não encontrado.'] })
        return;
    }
}


module.exports = {
    register,
    login,
    getCurrentUser,
    updateUser,
    getUserById,
    getAllUser,
    deleteUser
}
