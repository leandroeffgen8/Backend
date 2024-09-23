import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req)

    if(errors.isEmpty()){ 
        return next();
    }

    const getErrors: object[] = [];

    errors.array().map( err => getErrors.push(err.msg));
    return res.status(422).json({ errors: getErrors });
}

export default validate