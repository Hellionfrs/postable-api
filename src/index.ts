import express from "express";
import { authRouter } from "./routers/auth.router";

const app = express();
const port = 5500;

app.use(authRouter)
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
