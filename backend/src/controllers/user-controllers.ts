import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

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
};

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

        // find if the user is existing
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send("User already existed!");
        }

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
};

export const userLogin = 
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
    
    try {
        // user login by email and password
        const { email, password} = req.body();
        const user = await User.findOne({ email });

        if(!user){
            return res.status(401).send("User not registered.");
        }

        // validate password, import 'compare' from "bcrypt"
        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password");
        }

        // clear the old cookie after login
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });

        // Authenytication Process: create token and store cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        // if all pass validation checks
        return res.status(200).json({ message: "OK", id: user._id.toString() });

    } catch (error: any) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message});
    }
};