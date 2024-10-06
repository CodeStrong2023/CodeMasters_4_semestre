import { pool } from "../db.js";

export const listarTareas = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM tareas");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const listarTarea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tareas WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const crearTarea = async (req, res, next) => {
  const { titulo, descripcion } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tareas ( titulo, descripcion ) VALUES ($1, $2) RETURNING *",
      [titulo, descripcion]
    );
    res.json(result.rows[0]);
    console.log(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "ya existe una tarea con ese titulo",
      });
    }
    console.log(error);
    next(error);
  }
};

export const actualizarTarea = async (req, res) => {
  const { titulo, descripcion } = req.body;
  const id = req.params.id;
  const result = await pool.query(
    "UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *",
    [titulo, descripcion, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe una tarea con ese Id",
    });
  }

  return res.json(result.rows[0]);
};

export const eliminarTarea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM tareas WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
