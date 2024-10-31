package utn.tienda_libros.servicios;

import utn.tienda_libros.modelo.Libro;

import java.util.List;

public interface ILibroServicios {

    public List<Libro> listarLibros();

    public Libro buscarLibroPorId(Integer idLibro);

    public void garadarLibro( Libro libro);

    public void eliminarLibre(Libro libro);
}
