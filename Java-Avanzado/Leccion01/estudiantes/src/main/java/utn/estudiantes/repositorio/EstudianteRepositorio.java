
package utn.estudiantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.estudiantes.modelo.Estudiante;

/**
 *
 * @author Virginia
 */
public interface EstudianteRepositorio extends  JpaRepository<Estudiante, Integer>{
    
}
