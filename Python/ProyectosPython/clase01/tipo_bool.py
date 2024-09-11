
#Bool contiene los valores TRUE AND FALSE
# Los tipos numéricos, es false para el 0, true para los demas valores

valor = 0
resultado = bool(valor)
print(f'valor: {valor}, Resultado: {resultado}')

valor = 15
resultado = bool(valor)
print(f'valor: {valor}, Resultado: {resultado}')



#Tipo String --> False '', True demaás valores
valor = ''
resultado = bool(valor)
print(f'valor: {valor}, Resultado: {resultado}')


valor = 'Hola'
resultado = bool(valor)
print(f'valor: {valor}, Resultado: {resultado}')

#Tipo de colecciones --> False parta colecciones vacías
#Tipo de coleccions --> True para todas las demás 
#Lista
valor = []
resultado = bool(valor)
print(f'valor de una lista vacía: {valor}, Resultado: {resultado}')

valor = [5,4,3]
resultado = bool(valor)
print(f'valor de una lista con elementos: {valor}, Resultado: {resultado}')



#Tupla
valor = ()
resultado = bool(valor)
print(f'valor de una tupla vacía: {valor}, Resultado: {resultado}')


valor = (5,)
resultado = bool(valor)
print(f'valor de una tupla con elementos: {valor}, Resultado: {resultado}')


#Diccionario 
valor = {}
resultado = bool(valor)
print(f'valor de un diccionario vacio: {valor}, Resultado: {resultado}')


valor = {'Nombre':'Juan', 'Apellido': 'Perez'}
resultado = bool(valor)
print(f'valor de un diccionario vacio: {valor}, Resultado: {resultado}')


# Sentencia de control con bool

if bool ('Hola'):
    print('Regresa verdadero ')
else:
    print('Rgresa falso')


