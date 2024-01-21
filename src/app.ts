import express from "express";
import 'dotenv/config' 
import { configDotenv } from "dotenv";
import { postsRouter } from "./routers/posts.router";
import { userProfile } from "./routers/userProfile.router";
import { authRouter } from "./routers/auth.router";
import errorHandler from "./middlewares/error.middleware";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();

app.use(express.json());
app.use(authRouter)
app.use(userProfile)
app.use(postsRouter)
app.use(errorHandler)