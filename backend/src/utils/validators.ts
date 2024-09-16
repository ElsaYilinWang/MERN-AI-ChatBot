// express-validator
// ref: https://express-validator.github.io/docs/
import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

// create a custom validate
export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations){
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) { // No errors found
            return next();  // run next middleware
        }
        return res.status(422).json({ errors: errors.array()});
    };
};


// create a validator for signup process: name, email, password
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6}).withMessage("Password should contain at least 6 characters"),
];