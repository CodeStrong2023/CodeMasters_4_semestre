let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego(){
    let botonPersonajeJugador = document.getElementById('boton-personaje');
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);

    let botonPatada = document.getElementById("boton-patada")
    botonPatada.addEventListener('click',ataquePatada)

    let botonPunio = document.getElementById("boton-punio")
    botonPunio.addEventListener('click', ataquePunio)

    let botonBarrida = document.getElementById("boton-barrida")
    botonBarrida.addEventListener('click', ataqueBarrida)

    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener('click', reiniciarJuego)
    
}
function seleccionarPersonajeJugador(){ 
    //tarea agregar activad a la funcion al alegior el personaje
    let inputZuko = document.getElementById('zuko')
    let inputKatara = document.getElementById('katara')
    let inputAang = document.getElementById('aang')
    let inputToph = document.getElementById('toph')
    let spanPersonajeJugador = document.getElementById("personaje-jugador")

    if(inputZuko.checked){
        spanPersonajeJugador.innerHTML = 'Zuko'
    }else if(inputKatara.checked){
        spanPersonajeJugador.innerHTML = 'Katara'
    }else if(inputAang.checked){
        spanPersonajeJugador.innerHTML = 'Aang'
    }else if(inputToph.checked){
        spanPersonajeJugador.innerHTML = 'Toph'
    }else{
        alert('Selecciona un personaje')
        return
    }
    seleccionarPersonajeEnemigo()
}
function seleccionarPersonajeEnemigo(){//esta función va debajo de la función seleccionarPersonajeJugador para ser llamada
    let personajeAleatorio = aleatorio(1, 4)
    //A continuación creamos las variables para cada personaje
    let spanPersonajeEnemigo = document.getElementById("personaje-enemigo")

    //Comenzamos con la lógica de seleccionar aleatoriamente los personajes del enemigo
    if(personajeAleatorio == 1){
        spanPersonajeEnemigo.innerHTML = 'Zuko'
    }else if(personajeAleatorio == 2){
        spanPersonajeEnemigo.innerHTML = 'Katara'
    }else if(personajeAleatorio == 3){
        spanPersonajeEnemigo.innerHTML = 'Aang'
    }else{
        spanPersonajeEnemigo.innerHTML = 'Toph'
    }
}
function ataquePunio(){ //Modificamos la variable global ataqueJugador
    ataqueJugador = 'Punio'
    ataqueAleatorioEnemigo()
}
function ataquePatada(){ //Modificamos la variable global ataqueJugador
    ataqueJugador = 'Patada'
    ataqueAleatorioEnemigo()
}
function ataqueBarrida(){ //Modificamos la variable global ataqueJugador
    ataqueJugador = 'Barrida'
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo(){//Ahora ocupando la variable global nueva le decimos el ataque y necesitamos la función aleatorio
    let ataqueAleatorio = aleatorio(1, 3)
   
    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'Punio'
    } else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'Patada'
    } else {
        ataqueEnemigo = 'Barrida'
    }
    combate()
}
function combate(){
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    
    if(ataqueEnemigo == ataqueJugador){
        crearMensaje("EMPATE")
    }else if(ataqueJugador == "Punio" && ataqueEnemigo == "Barrida"){
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if(ataqueJugador == "Patada" && ataqueEnemigo == "Punio"){
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if(ataqueJugador == "Barrida" && ataqueEnemigo == "Patada"){
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else{
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    //Revisar vidas
    revisarVidas()
}

function revisarVidas(){
    if (vidasEnemigo == 0){
        crearMensajeFinal("Felicitaciones!!! HAS GANADO")
    }else if(vidasJugador ==0 ){
        crearMensajeFinal("Lo siento!!! HAS PERDIDO")
    }
}

function crearMensajeFinal(resultadoFinal){
    let sectionMensaje = document.getElementById("mensajes")
    let parrafo = document.createElement("p")

    parrafo.innerHTML= resultadoFinal

    sectionMensaje.appendChild(parrafo)

    let botonPunio = document.getElementById("boton-punio")//Ahora creamos un escuchador de eventos
    botonPunio.disabled = true

    let botonPatada = document.getElementById("boton-patada")
    botonPatada.disabled = true

    let botonBarrida = document.getElementById("boton-barrida")
    botonBarrida.disabled = true

}
function crearMensaje(resultado){
    let sectionMensaje = document.getElementById("mensajes")
    let parrafo = document.createElement("p")

    parrafo.innerHTML= "Tu personaje atacó con " +ataqueJugador + ", el personaje del enemigo atacó con "+ ataqueEnemigo +' - '+resultado

    sectionMensaje.appendChild(parrafo)

    //Utilizamos 3 elementos de manipulación del DOM:1.innerHTML, 2. createElement, 3. appendChild
}

function aleatorio(min, max){
    return Math.floor( Math.random() * (max - min +1) + min)
}
function reiniciarJuego(){
    location.reload()//Método de la interfaz recarga la URL actual, como el boton Actualizar
}



window.addEventListener('load', iniciarJuego)