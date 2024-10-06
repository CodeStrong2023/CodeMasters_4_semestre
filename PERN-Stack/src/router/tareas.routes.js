import expressPromiseRouter from 'express-promise-router'; // Importar el módulo completo
const router = expressPromiseRouter(); // Crear una instancia de router

import { actualizarTarea, crearTarea, eliminarTarea, listarTareas, listarTarea } from "../controllers/tareas.controllers.js";

router.get("/tareas", listarTareas);
router.get("/tareas/:id", listarTarea);
router.post("/tareas", crearTarea);
router.put("/tareas/:id", actualizarTarea);
router.delete("/tareas/:id", eliminarTarea);

export default router;
