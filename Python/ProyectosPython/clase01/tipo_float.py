# Profundizacion en el tipo float
a = 3.0


#Constructor de tipo float -> pude recibir int y str
a = float(10)
a = float('10')
print(f'a: {a:.2f}')

# Notacion exponencia (valores positivos o negativos)
a = 3e50
print(f'a: {a}')

a = 3e-5
print(f'a: {a:.5f}')

#cualquier calculo que incluye un float , todo cambia a float

a = 4.0 + 5
print(a)
print(type(a))