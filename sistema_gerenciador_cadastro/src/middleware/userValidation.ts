import { body } from "express-validator";

const userCreateValidation = () => {
    return [
        body('name')
            .isString()
            .withMessage('O nome é obrigatório.')
            .isLength({ min: 3 })
            .withMessage('O nome precisa ter mais que 3 caracteres'),
        body('email')
            .isString()
            .withMessage('O e-mail é obrigatório')
            .isEmail()
            .withMessage('Insira um e-mail válido'),
        body('password')
            .isString()
            .withMessage('A senha é obrigatória')
            .isLength({ min: 5 })
            .withMessage('A senha precisa ter no mínimo 5 caracteres'),
        body('gender')
            .isString()
            .withMessage('O sexo é obrigatório.'),
        body('birthDate')
            .isString()
            .withMessage('A data de nascimento é obrigatório.')
            .custom((value) => {
                const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                if(!regex.test(value)){
                    throw new Error('Insira a data no formato dd/MM/yyyy')
                }
                return true
            }),
        body('area') 
            .isString()
            .withMessage('A área de atuação é obrigatória')

    ]
}

const updateValidation = () => {
    return [
        body('name')
            .optional()
            .isLength({ min: 3 })
            .withMessage('O nome precisa ter mais que 3 caracteres'),
        body('password')
            .optional()
            .isLength({ min: 5 })
            .withMessage('A senha precisa ter no mínimo 5 caracteres'),
        body('birthDate')
            .optional()
            .custom((value) => {
                const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                if(!regex.test(value)){
                    throw new Error('Insira a data no formato dd/MM/yyyy')
                }
                return true
        }),
    ]
}

export {
    userCreateValidation,
    updateValidation
}