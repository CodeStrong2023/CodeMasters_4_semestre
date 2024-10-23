import express from "express";
import morgan from "morgan";
import tareasRouter from "./router/tareas.routes.js";
import authRouter from "./router/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
//Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());//es correcto para parsear solicitudes con cuerpos en formato JSON.
app.use(express.urlencoded({ extended: false}));//esperas solicitudes con cuerpos codificados en x-www-form-urlencoded (por ejemplo, formularios HTML).

app.get("/", (req, res) => res.json({message: "Bienvenidos a mi proyecto"}));
app.use("/api", tareasRouter);
app.use("/api", authRouter);

//Manejo de errores
app.use((err, req, res ,next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    });
});
export default app;