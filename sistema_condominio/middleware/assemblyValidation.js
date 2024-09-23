import { body } from 'express-validator';

export const createAssemblyValidation = () => {
    return [
        body('local')
            .isString()
            .withMessage('o local é obrigatório'),
        body('dayOf')
            .isDate()
            .withMessage('A data é obrigatória'),
        body('startTime')
            .isTime()
            .withMessage('A hora é obrigatória'),
        body('subject')
            .isString()
            .withMessage('O assunto é obrigatório')
    ]
}