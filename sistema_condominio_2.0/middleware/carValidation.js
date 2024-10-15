import { body } from 'express-validator';

export const createCarValidation = () => {
    return [
        body('modelo')
            .isString()
            .notEmpty()
            .withMessage('O modelo do carro é obrigátorio'),

        body('placa')
            .isString()
            .notEmpty()
            .withMessage('A placa do carro é obrigátoria'),
        body('cor')
            .isString()
            .notEmpty()
            .withMessage('A cor do carro é obrigátoria'),
        body('vagaEstacionamento')
            .isString()
            .notEmpty()
            .withMessage('O numero da vaga é obrigátorio')
    ]
}