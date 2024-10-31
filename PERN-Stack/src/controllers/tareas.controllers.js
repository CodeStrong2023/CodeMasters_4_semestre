import { pool } from "../db.js";

export const listarTareas = (req, res) => res.send("Obteniendo tareas");

export const listarTrea = (req, res) => res.send("Obteniendo tarea única");

export const crearTarea = (req, res) => {
    console.log(req.body);
    res.send("Creando tarea");

    const resultado = pool.query("INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2)", [titulo,descripcion]);
    console.log(resultado);
};


export const actualizarTarea = (req, res) => res.send("Actualizando tarea unica");

export const eliminarTarea = (req, res) => res.send("Eliminando tarea unica");

