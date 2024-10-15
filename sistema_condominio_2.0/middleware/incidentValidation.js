import { body } from 'express-validator';

export const incidentValidation = () => {
    return [
        body('title')
            .isString()
            .notEmpty()
            .withMessage('O título é obrigatório'),
        body('description')
            .isString()
            .notEmpty()
            .withMessage('A descrição é obrigatória')
    ]
}