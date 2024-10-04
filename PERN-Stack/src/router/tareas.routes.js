import { Router } from "express";
import { actualizarTarea, crearTarea, eliminarTarea, listarTareas, listarTrea } from "../controllers/tareas.controllers.js";

const router = Router();

router.get("/tareas",listarTareas );

router.get("/tareas/:id", listarTrea);

router.post("/tareas",crearTarea );

router.put("/tareas/:id", actualizarTarea);

router.delete("/tareas/:id", eliminarTarea);


export default router;