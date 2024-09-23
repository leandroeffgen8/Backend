import { body } from 'express-validator';

export const notificationValidation = () => {
    return [
        body('title')
            .isString()
            .withMessage('O títuto é obrigatório'),
        body('message')
            .isString()
            .withMessage('A mensagem é obrigatória')
    ]
}