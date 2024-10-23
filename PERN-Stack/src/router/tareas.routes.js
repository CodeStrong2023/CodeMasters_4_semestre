import Router from "express-promise-router";
import { actualizarTarea, crearTarea, eliminarTarea, listarTareas, listarTarea } from "../controllers/tareas.controllers.js";
import {isAuth} from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/tareas",isAuth, listarTareas );

router.get("/tareas/:id", isAuth, listarTarea);

router.post("/tareas", isAuth, crearTarea);

router.put("/tareas/:id",isAuth,  actualizarTarea);

router.delete("/tareas/:id",isAuth, eliminarTarea);


export default router;