import express from "express";
import { authRouter } from "./routers/auth.router";
import errorHandler from "./middlewares/error.middleware";
import 'dotenv/config' 
import { userProfile } from "./routers/userProfile.router";

const app = express();
const port = 5500;
app.use(express.json());
app.use(authRouter)
app.use(userProfile)
app.use(errorHandler)
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
