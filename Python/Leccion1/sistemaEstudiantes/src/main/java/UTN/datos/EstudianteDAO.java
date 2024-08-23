package UTN.datos;

import UTN.dominio.Estudiante;

import static UTN.conexion.Conexion.getConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class EstudianteDAO {
    //Metod listar
    public static List<Estudiante> listarEstudiantes(){
        List<Estudiante> estudiantes = new ArrayList<>();
        // Creamos algunos objetos que son necesarios para comunicarnos con la base de datos
        PreparedStatement ps; //Envia la sentencia a la base de datos
        ResultSet rs; //Obtenemos el resultado de la base de datos
        // Creamos un objeto de tipo conexion
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2024 ORDER BY idestudiantes2024";
        try{
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                var estudiante = new Estudiante();
                estudiante.setIdEstudiante(rs.getInt("idestudiantes2024"));
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                //Fatal agregado a la lista
                estudiantes.add(estudiante);
            }
        }catch (Exception e){
            System.out.println("Ocurrio un error al seleccionar datos: "+e.getMessage());
        }
        finally {
            try{
                con.close();
            }catch (Exception e){
                System.out.println("Ocurrio un error al cerrar la conexion: "+e.getMessage());
            }
        }// Finally
        return estudiantes;
    }// Fin metodo lister

    // Metodo por id -> fin by id
    public boolean buscarEstudiantePorId(Estudiante estudiante){
        PreparedStatement ps;
        ResultSet rs;
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2024 WHERE idestudiantes2024=?";
        try{
            ps = con.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            rs = ps.executeQuery();
            if (rs.next()){
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                return true; // Se encontro un registro
            }//Fin id
        } catch (Exception e){
            System.out.println("Ocurrio un error al buscar estudiante: "+e.getMessage());
        }
        finally {
            try {
                con.close();
            }catch (Exception e){
                System.out.println("Ocurrio un error al cerrar la conexion: "+e.getMessage());
            }//Fin catch
        }//Fin finally
        return false;
    }

    // Metodo agregar un nuevo estuiante
    public boolean agregarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "INSERT INTO estudiantes2024 (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)";
        try{
            ps = con.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.execute();
            return true;
        }catch(Exception e){
            System.out.println("Ocurrio un error al agregar estudiante: "+e.getMessage());
        }//Fin catch
        finally {
            try{
                con.close();
            }catch (Exception e){
                System.out.println("Error al cerrar la conexion: "+e.getMessage());
            } // Fin catch
        }// Fin finally
        return false;
    } //Fin metodo agregarEstudiante

    // Metodo para modificar estudiante
    public boolean modificarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "UPDATE estudiante2024 SET nombre=?, apellido=?, telefono=?, email=? WHERE idestudiantes2024=?";
        try{
            ps = con.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.setInt(5, estudiante.getIdEstudiante());
            ps.execute();
            return true;
        }catch (Exception e){
            System.out.println("Error al modificar estudiante: "+e.getMessage());
        } // Fin catch
        finally {
            try {
                con.close();
            }catch (Exception e){
                System.out.println("Error al cerrar la conexion: "+e.getMessage());
            }// Fin catch
        }// Fin finally
        return false;
    }// Fin metodo modificarEstudiante

    public boolean eliminarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "DELETE FROM estudiante2024 WHERE idestudiante2024=?";
        try{
            ps = con.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            ps.execute();
            return true;
        }catch (Exception e){
            System.out.println("Error al eliminar estudiante: "+e.getMessage());
        }
        finally {
            try{
                con.close();
            }catch (Exception e){
                System.out.println("Error al cerrar la conexion: "+e.getMessage());
            }
        }
        return false;
    }


    public static void main(String[] arg){
        var estudiantesDao = new EstudianteDAO();
        //Metodo estudiante
        //var estudianteModificado = new Estudiante(1, "Juan Carlos", "Juarez", "2604784512", "juan@mail.com");
        //var modificado = estudiantesDao.modificarEstudiante(estudianteModificado);
        //if(modificado)
        //    System.out.println("Estudiante modificado: "+estudianteModificado);
        //else
        //    System.out.println("No se modifico el estudiante: "+estudianteModificado);

        //Agregar estudiante
        //var nuevoEstudiante =  new Estudiante("Carlos", "Lara", "2604256594", "carlos@gmail.com");
        //var agregado = estudiantesDao.agregarEstudiante(nuevoEstudiante);
        //if(agregado){
        //    System.out.println("Estudiante agregado: "+nuevoEstudiante);
        //}

        //Eliminar estudiante con id 3
        var estudianteEliminar = new Estudiante(4);
        var eliminado = estudiantesDao.eliminarEstudiante(estudianteEliminar);
        if(eliminado)
            System.out.println("Estudiante eliminado: "+estudianteEliminar);
        else
            System.out.println("No se elimino estudiante: "+estudianteEliminar);

        // Listar los estudiantes
        System.out.println("Listado de estudiantes: ");
        List<Estudiante> estudiantes = estudiantesDao.listarEstudiantes();
        estudiantes.forEach(System.out::println);// Funcion lambda para imprimir


        // Buscar por id
        //var estudiante1 = new Estudiante(3);
        //System.out.println("Estrudiantes antes de la busqueda: "+estudiante1);
        //var encontrando = estudiantesDao.buscarEstudiantePorId(estudiante1);
        //if(encontrando)
        //    System.out.println("Estudiantes encontrado: "+estudiante1);
        //else
        //    System.out.println("No se encontro el estudiante: "+estudiante1.getIdEstudiante());
    }

}
