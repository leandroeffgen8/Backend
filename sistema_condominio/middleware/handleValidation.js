import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {

    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next()
    }

    const getErros = [];

    errors.array().map( err => getErros.push(err.msg) );

    console.log('getErros', getErros)

    return res.status(422).json({ errors: getErros });

}