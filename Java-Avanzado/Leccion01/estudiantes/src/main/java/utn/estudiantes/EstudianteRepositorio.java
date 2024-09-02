package utn.estudiantes;

import org.springframework.data.repository.JpaReposotory;
import org.springframework.stereotype.Repository;
import utn.estudiantes.modelo.Estudiante;

@Repository
public class EstudianteRepositorio extends JpaRepository<Estudiante, Integer> {

	public static void main(String[] args) {
		SpringApplication.run(EstudiantesApplication.class, args);
	}

}
