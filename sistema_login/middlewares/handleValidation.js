const { validationResult } = require('express-validator');

const validate = (req,  res, next) => {

    const errors = validationResult(req)
 
    if(errors.isEmpty()){
        return next()
    } 

    const getErros = [];

    errors.array().map( err => getErros.push(err.msg));

    return res.status(422).json({ errors: getErros });

}

module.exports = validate;