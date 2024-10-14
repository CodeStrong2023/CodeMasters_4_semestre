package utn.tien_libros.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarte.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


/**
 * The type Libro.
 */
@Entity
@Data
@NoArgsconstructor
@AllArgsConstructor
@ToString
public class Libro {
    @Id
    @GenerateValue(strategy = GenerationType.IDENTITY)
    Integer idLibro;
    String autor;
    Double precio;
    Integer existencias;

}