import express from "express";
import { authRouter } from "./routers/auth.router";
import errorHandler from "./middlewares/error.middleware";

const app = express();
const port = 5500;
app.use(express.json());
app.use(authRouter)
app.use(errorHandler)
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
