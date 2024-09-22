import { Router } from "express";
import { getAllUsers, userSignup, userLogin, verifyUser, userLogout } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator),userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/logout", verifyToken, userLogout);

// create another route to test credentials
userRoutes.get("/auth-status", verifyToken, verifyUser);
export default userRoutes;