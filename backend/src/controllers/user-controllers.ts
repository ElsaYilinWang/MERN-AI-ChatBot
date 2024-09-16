import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { hash } from "bcrypt";

export const getAllUsers = 
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
    
    try {
        // get all users
        const users = await User.find();

        // issue: This expression is not callable. Type 'Number' has no call signatures
        // solution: import { Response } from "express"
        // ref: https://stackoverflow.com/questions/60463324/this-expression-is-not-callable-type-number-has-no-call-signatures
        return res.status(200).json({ message: "OK", users});
    
        // issue: 'error' is of Type 'Unknown'
        // solution: narrow down error's type by " error: any"
    } catch (error: any) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message});
    }
}

export const userSignup = 
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
    
    try {
        // user signup
        // from req body: name, email, password
        const { name, email, password } = req.body;

        // password needs encryption so import 'hash' from bcrypt
        const hashedPassword = await hash(password, 10);

        // create a new user, following userSchema, with hashed password
        const user = new User({ name, email, password: hashedPassword}); 
        
        // save the user
        await user.save();

        // issue: This expression is not callable. Type 'Number' has no call signatures
        // solution: import { Response } from "express"
        // ref: https://stackoverflow.com/questions/60463324/this-expression-is-not-callable-type-number-has-no-call-signatures
        return res.status(200).json({ message: "OK", id: user._id.toString()});
    
        // issue: 'error' is of Type 'Unknown'
        // solution: narrow down error's type by " error: any"
    } catch (error: any) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message});
    }
}