import { body } from 'express-validator';

export const pollValidation = () => {
    return [
        body('title')
            .isString()
            .notEmpty()
            .withMessage('O título é obrigatório')
    ]
}