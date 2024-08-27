from Usuario import Usuario
from Usuario_dao import UsuarioDAO
from logger_base import log
from cursor_del_pool import Conexion  # Asegúrese de importar la clase Conexion

def main():
    # Inicializar la conexión y crear la tabla si no existe
    try:
        Conexion.obtenerPool()
    except Exception as e:
        log.error(f"Error al inicializar la conexión: {e}")
        return

    opcion = None
    while opcion != 5:
        try:
            print("Opciones: ")
            print("1. Listar Usuarios")
            print("2. Agregar Usuario")
            print("3. Modificar Usuario")
            print("4. Eliminar Usuario")
            print("5. Salir")
            opcion = int(input("Digite la opción (1-5): "))

            if opcion == 1:
                usuarios = UsuarioDAO.seleccionar()
                for usuario in usuarios:
                    log.info(usuario)
            elif opcion == 2:
                username_var = input("Digite el nombre de usuario: ")
                password_var = input("Digite la contraseña: ")
                usuario = Usuario(username=username_var, password=password_var)
                usuario_insertado = UsuarioDAO.insertar(usuario)
                log.info(f"Usuario insertado: {usuario_insertado}")
            elif opcion == 3:
                id_usuario_var = int(input("Digite el id del usuario a modificar: "))
                username_var = input("Digite el nombre del usuario a modificar: ")
                password_var = input("Digite la contraseña del usuario a modificar: ")
                usuario = Usuario(id_usuario=id_usuario_var, username=username_var, password=password_var)
                usuario_actualizado = UsuarioDAO.actualizar(usuario)
                log.info(f"Usuario actualizado: {usuario_actualizado}")
            elif opcion == 4:
                id_usuario_var = int(input("Digite el id del usuario a eliminar: "))
                usuario = Usuario(id_usuario=id_usuario_var)
                usuario_eliminado = UsuarioDAO.eliminar(usuario)
                log.info(f"Usuario eliminado: {usuario_eliminado}")
            elif opcion == 5:
                log.info("Salimos de la aplicación. ¡Hasta pronto!")
            else:
                log.warning("Opción inválida. Por favor, elija una opción entre 1 y 5.")
        except ValueError as e:
            log.error(f"Error de entrada: {e}")
        except Exception as e:
            log.error(f"Ocurrió un error: {e}")

if __name__ == '__main__':
    main()