#Bool contiene los valores de TRue y false 
#los tipos númericos. es false para el cero, true para los demas valores 
valor= 0
resultado= bool(valor)
print(f'valor: {valor}, Resultado: {resultado}')

valor= 0.1
resultado= bool(valor)
print(f'valor: {valor}, Resultado: {resultado}')

#tipo de string -> false "", true ademas valores
valor= ''
resultado= bool(valor)
print(f'valor: {valor}, Resultado: {resultado}')

valor= 'Hola'
resultado= bool(valor)
print(f'valor: {valor}, Resultado: {resultado}')

#Tipo colecciones-> false para colecciones vacias
#Tipo colecciones-> true para las demas
#listas
valor= []
resultado= bool(valor)
print(f'valor de una lista vacia: {valor}, Resultado: {resultado}')

valor= [1,2,3]
resultado= bool(valor)
print(f'valor de una lista: {valor}, Resultado: {resultado}')

#tupla
valor= ()
resultado= bool(valor)
print(f'valor de una tupla vacia: {valor}, Resultado: {resultado}')

valor= (5,"hola", 6)
resultado= bool(valor)
print(f'valor de una tupla: {valor}, Resultado: {resultado}')

#diccionario
valor= {}
resultado= bool(valor)
print(f'valor de un diccionario vacio: {valor}, Resultado: {resultado}')

valor= {'nombre':'Juan', 'apellido': 'perez'}
resultado= bool(valor)
print(f'valor de un diccionario: {valor}, Resultado: {resultado}')

#sentencia de control
if valor:
    print('regresa verdadero')
else:
    print('regresa falso')

#ciclos
variable= 17
while variable:
    print('regresa verdadero')
    break
else:
    print('regresa falso')