import { body } from 'express-validator';

export const createReserveValidation = () => {
    return [
        body('area')
            .isString()
            .withMessage('O campo area é obrigatório'),
        body('date')
            .isDate()
            .withMessage('A data é obrigatória'),
        body('startTime')
            .isTime()
            .withMessage('O inicio d horário é obrigatório'),
        body('endTime')
            .isTime()
            .withMessage('O fim do horário é obrigatório')
    ]
}