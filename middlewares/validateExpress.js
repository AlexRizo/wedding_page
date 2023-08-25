import { validationResult } from "express-validator"

const validateExpress = (req, res, next) => {
    const validations = validationResult(req);

    if (!validations.isEmpty()) {
        return res.status(400).json({
            res: validations
        });
    }
    
    next();
}

export default validateExpress;