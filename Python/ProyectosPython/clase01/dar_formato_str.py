# dar formato a un string

nombre = 'Julieta'
edad = 21
mensaje_con_formato = 'Mi nombre es %s y tengo %d años'%(nombre, edad)

#Creamos una tupla
persona = ('Carla', 'Gomez', 5000.00)
mensaje_con_formato = 'Hola %s %s. Tu sueldo es %.2f'
# print(mensaje_con_formato % persona)

nombre = 'Juan'
edad = 19
sueldo = 3000
mensaje_con_formato = 'Nombre {} Edad {} Sueldo {:.2f}'.format(nombre, edad, sueldo)
# print(mensaje_con_formato)

# mensaje = 'Nombre {0} Edad {1} Sueldo {2:.2f}'.format(nombre, edad, sueldo)
# print(mensaje)

mensaje = 'Nombre {n} Edad {e} Sueldo {s:.2f}'.format(n=nombre, e=edad, s=sueldo)
# print(mensaje)

diccionario = {'nombre': 'Micaela', 'Edad': 35, 'Sueldo': 8000.00}
mensaje = f'Nombre {diccionario[nombre]} Edad {diccionario[edad]}'.format(dic=diccionario)
print(mensaje)