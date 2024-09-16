import express from "express";
import { config } from "dotenv";
// issue: Cannot find module 'morgan' or its corresponding type declarations 
// answer: run npm link morgan
// ref: https://stackoverflow.com/questions/73738113/cannot-find-module-morgan-and-but-i-see-morgan-exists-as-dependencies-in-my-pa
import morgan from "morgan";
import appRouter from "./routes/index.js";

config();

const app = express();

// middleware
app.use(express.json());


// remove in production
app.use(morgan("dev"));


app.use("api/v1", appRouter);

export default app;