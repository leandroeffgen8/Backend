import { body } from "express-validator";

export const userCreateValidation = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('O nome é obrigatório')
            .isLength({ min: 3 })
            .withMessage('O nome precisa ter no mínimo 3 caracteres'),
        body('email')
            .notEmpty()
            .withMessage('O e-mail é obrigatório')
            .isEmail()
            .withMessage('Insira um e-mail válido'),
        body('password')
            .notEmpty()
            .withMessage('A senha é obrigatória')
            .isLength({ min: 5 })
            .withMessage('A senha precisa ter no mínimo 5 caracteres'),
        body('confirmpassword')
            .notEmpty()
            .withMessage('A confirmação de senha é obrigatória')
            .custom( (value, {req}) => {
                if(value != req.body.password){
                    throw new Error('As senhas não são iguais')
                }
                return true
            }),
        body('role')
            .notEmpty()
            .withMessage('A função é obrigatória'),
        body('apto')
            .notEmpty()
            .withMessage('O numero do apto é obrigatório')
    ]
}

export const loginValidation = () => {
    return [
        body('email')
            .notEmpty()
            .withMessage('O e-mail é obrigatório')
            .isEmail()
            .withMessage('Insira um e-mail válido'),
        body('password')
            .notEmpty()
            .withMessage('A senha é obrigatória')
    ]
}

export const updateValidation = () => {
    return [
        body('name')
            .optional()
            .isLength({ min: 3 })
            .withMessage('O nome precisa ter no mínimo 3 caracteres'),
        body('password')
            .optional()
            .isLength({ min: 5 })
            .withMessage('A senha precisar ter no mínimo 5 caracteres')
    ]
}