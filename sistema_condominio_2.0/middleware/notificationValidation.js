import { body } from 'express-validator';

export const notificationValidation = () => {
    return [
        body('title')
            .isString()
            .notEmpty()
            .withMessage('O títuto é obrigatório'),
        body('message')
            .isString()
            .notEmpty()
            .withMessage('A mensagem é obrigatória')
    ]
}