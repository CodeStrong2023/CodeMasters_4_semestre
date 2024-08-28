from logger_base import log
import psycopg2
from psycopg2.pool import SimpleConnectionPool
from Usuario import Usuario

class Conexion:
    _DATABASE = 'test_bd'  # Reemplace con el nombre real de su base de datos si es diferente
    _USERNAME = 'postgres'
    _PASSWORD = '12345'
    _DB_PORT = '5433'
    _HOST = 'localhost'
    _MIN_CON = 1
    _MAX_CON = 5
    _pool = None

    @classmethod
    def obtenerPool(cls):
        if cls._pool is None:
            try:
                cls._pool = SimpleConnectionPool(
                    cls._MIN_CON, cls._MAX_CON,
                    host=cls._HOST,
                    user=cls._USERNAME,
                    password=cls._PASSWORD,
                    port=cls._DB_PORT,
                    database=cls._DATABASE
                )
                log.debug(f'Creación del pool exitosa: {cls._pool}')
                cls._crearTablaUsuario()
            except Exception as e:
                log.error(f'Ocurrió un error al obtener el pool: {e}')
                raise
        return cls._pool

    @classmethod
    def _crearTablaUsuario(cls):
        crear_tabla_query = '''
        CREATE TABLE IF NOT EXISTS usuario (
            id_usuario SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL
        )
        '''
        conexion = cls.obtenerConexion()
        try:
            with conexion.cursor() as cursor:
                cursor.execute(crear_tabla_query)
            conexion.commit()
            log.debug('Tabla usuario creada o ya existente')
        except Exception as e:
            log.error(f'Error al crear la tabla usuario: {e}')
            conexion.rollback()
        finally:
            cls.liberarConexion(conexion)

    @classmethod
    def obtenerConexion(cls):
        conexion = cls.obtenerPool().getconn()
        log.debug(f'Conexión obtenida del pool: {conexion}')
        return conexion

    @classmethod
    def liberarConexion(cls, conexion):
        cls.obtenerPool().putconn(conexion)
        log.debug(f'Regresamos la conexión al pool: {conexion}')

    @classmethod
    def cerrarConexiones(cls):
        cls.obtenerPool().closeall()

    @classmethod
    def seleccionar(cls):
        with CursorDelPool() as cursor:
            log.debug('Ejecutando consulta de selección de usuarios')
            cursor.execute(cls._SELECT)
            registros = cursor.fetchall()
            log.debug(f'Registros recuperados: {len(registros)}')
            usuarios = []
            for registro in registros:
                usuario = Usuario(registro[0], registro[1], registro[2])
                log.debug(f'Usuario recuperado: {usuario}')
                usuarios.append(usuario)
            return usuarios


class CursorDelPool:
    def __init__(self):
        self._conexion = None
        self._cursor = None

    def __enter__(self):
        self._conexion = Conexion.obtenerConexion()
        self._cursor = self._conexion.cursor()
        return self._cursor

    def __exit__(self, tipo_excepcion, valor_excepcion, detalle_excepcion):
        if valor_excepcion:
            self._conexion.rollback()
            log.error(f'Ocurrió una excepción, se hace rollback: {valor_excepcion} {tipo_excepcion} {detalle_excepcion}')
        else:
            self._conexion.commit()
            log.debug('Commit de la transacción')
        self._cursor.close()
        Conexion.liberarConexion(self._conexion)

    

# Prueba de la conexión
if __name__ == '__main__':
    try:
        with CursorDelPool() as cursor:
            log.debug('Dentro del bloque with')
            cursor.execute('SELECT * FROM usuario')
            usuarios = cursor.fetchall()
            log.debug(f'Usuarios obtenidos: {usuarios}')
    except Exception as e:
        log.error(f'Error durante la ejecución: {e}')