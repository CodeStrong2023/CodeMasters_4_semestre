package utn.estudiantes.servicio;

import utn.estudiantes.modelo.Estudiante;

import java.util.List;

public interface IdEstudianteServicio {
    public List<Estudiante> listarEstudiante();
    public Estudiante buscarEstudiantePorId(Integer idEstudiante);
    public void guardarEstudiante(Estudiante estudiante);
    public void eliminarEstudante(Estudiante estudiante);
}