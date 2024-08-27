import logging as log

# docs.python.org/3/howto/logging.html
# Llamamos una configuración básica
log.basicConfig(
    level=log.DEBUG,  # Cambia el nivel de log a DEBUG para capturar más información
    format='%(asctime)s:%(levelname)s [%(filename)s:%(lineno)s] %(message)s',
    datefmt='%I:%M:%S %p',
    handlers=[
        log.FileHandler('capa_datos.log', encoding='utf8'),
        log.StreamHandler()
    ]
)


if __name__ == '__main__':
    log.debug('Mensaje a nivel debug')
    log.info('Mensaje a nivel info')
    log.warning('Mensaje a nivel warning')
    log.error('Mensaje a nivel error')
    log.critical('Mensaje a nivel critical')
