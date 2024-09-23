import { body } from 'express-validator';

export const incidentValidation = () => {
    return [
        body('title')
            .isString()
            .withMessage('O título é obrigatório'),
        body('description')
            .isString()
            .withMessage('A descrição é obrigatória')
    ]
}