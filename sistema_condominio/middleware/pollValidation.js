import { body } from 'express-validator';

export const pollValidation = () => {
    return [
        body('title')
            .isString()
            .withMessage('O título é obrigatório')
    ]
}