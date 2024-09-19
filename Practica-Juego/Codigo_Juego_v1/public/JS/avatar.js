
const personajes = ['Zuko', 'Katara', 'Aang', 'Toph'];
// Array de ataques disponibles
const ataques = ['Punio', 'Patada', 'Barrida'];

// Variables para almacenar el ataque del jugador y del enemigo
let ataqueJugador
let ataqueEnemigo
// Variables para almacenar las vidas del jugador y del enemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego(){
    //Mostrar la seccion de seleccionar personaje
    document.getElementById('seleccionar-personaje').style.display = 'flex';

    //Oculatar la seccion de selección ce ataque
    document.getElementById('seleccionar-ataque').style.display = 'none';

    // Añadir eventos a los botones para seleccionar personaje y ataque
    document.getElementById('boton-personaje').addEventListener('click', seleccionarPersonajeJugador);

    document.getElementById("boton-patada").addEventListener('click', ataquePatada);
    
    document.getElementById("boton-punio").addEventListener('click', ataquePunio);


    document.getElementById("boton-barrida").addEventListener('click', ataqueBarrida);

    document.getElementById("boton-reiniciar").addEventListener('click', reiniciarJuego)
    
}

function toggleReglas(){
    // Función para mostrar u ocultar las reglas del juego
    const reglas = document.getElementById('reglas-juego');
    const botonReglas = document.getElementById('boton-reglas');
    const secciones = [
        document.getElementById('seleccionar-personaje'),
        document.getElementById('seleccionar-ataque'),
        document.getElementById('reiniciar'),
        document.getElementById('mensaje-final')];

    // Alternar la visibilidad de la sección de reglas    
    if(reglas.style.display === 'none' || reglas.style.display === ''){
        reglas.style.display = 'block';
        botonReglas.textContent = 'Ocultar Reglas';
        // Ocultar las otras secciones
        secciones.forEach(section => section.style.display = 'none');
    }else{
        reglas.style.display = 'none';
        botonReglas.textContent = 'Mostrar Reglas';
        // Mostrar las otras secciones nuevamente
        secciones.forEach(section => section.style.display = 'block');
    }
}

function seleccionarPersonajeJugador(){ 
    // Aquí la lógica para la selección del personaje
    let personajeSeleccionado = personajes.find(p => document.getElementById(p.toLowerCase()).checked);
    let spanPersonajeJugador = document.getElementById('personaje-jugador');

    if(personajeSeleccionado){
        spanPersonajeJugador.innerHTML = personajeSeleccionado
    }else{
        alert('Selecciona un personaje')
        return
    }

    // Ocultar la sección de selección de personaje 
    document.getElementById('seleccionar-personaje').style.display = 'none';

    // Ocultar la sección de selección de ataques
    document.getElementById('seleccionar-ataque').style.display = 'flex';

    seleccionarPersonajeEnemigo()
}

function seleccionarPersonajeEnemigo(){//esta función va debajo de la función seleccionarPersonajeJugador para ser llamada
    let personajeAleatorio = personajes[aleatorio(0, personajes.length -1)];
    
    document.getElementById('personaje-enemigo').innerHTML = personajeAleatorio;
}

function ataquePunio(){ // Funciones para manejar los ataques del jugador
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
    }else if((ataqueJugador === "Punio" && ataqueEnemigo === "Barrida") ||(ataqueJugador === "Patada" && ataqueEnemigo === "Punio")|| (ataqueJugador === "Barrida" && ataqueEnemigo === "Patada")){
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    //Revisar vidas
    revisarVidas();
}

function revisarVidas(){
    if (vidasEnemigo === 0){
        crearMensajeFinal("Felicitaciones!!! HAS GANADO")
        cambiarAReiniciar();
    }else if(vidasJugador ==0 ){
        crearMensajeFinal("Lo siento!!! HAS PERDIDO")
        cambiarAReiniciar();
    }
   
}

function cambiarAReiniciar(){
    //ocultar la section de ataque
    const seccionAtque = document.getElementById('seleccionar-ataque');
    seccionAtque.style.display = 'none';

    //mostrar la seccion reiniciar
    const seccionReiniciar = document.getElementById('reiniciar');
    seccionReiniciar.style.display = 'block';

    //mostrar los mensajes del combate en la seccion de reiniciar

    const mensajesCombate = document.getElementById('mensajes');
    seccionReiniciar.appendChild(mensajesCombate);

    //mostrar el boton reiniciar
    const botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.style.display = 'block';
}

function crearMensajeFinal(resultado){
    const divMensajeFinal = document.getElementById('mensaje-final');
    divMensajeFinal.innerHTML = `
    <p>${resultado}</p>
    <button id="boton-reiniciar" onclick="reiniciarJuego()">Reiniciar</button>`;
}

function crearMensaje(resultado){
    let sectionMensaje = document.getElementById("mensajes")
    let parrafo = document.createElement("p");
    parrafo.innerHTML= "Tu personaje atacó con " + ataqueJugador + ", el personaje del enemigo atacó con "+ ataqueEnemigo +' - '+resultado
    sectionMensaje.appendChild(parrafo)

    //Utilizamos 3 elementos de manipulación del DOM:1.innerHTML, 2. createElement, 3. appendChild
}

function aleatorio(min, max){
    return Math.floor( Math.random() * (max - min +1) + min)
}
function reiniciarJuego(){
    // Ocultar la sección de ataque
    document.getElementById('seleccionar-ataque').style.display = 'none';
    
    // Mostrar la sección de seleccionar personaje
    document.getElementById('seleccionar-personaje').style.display = 'flex';

    // Limpiar la sección de mensajes
    document.getElementById('mensajes').innerHTML = '';

    // Habilitar botones de ataque
    document.getElementById("boton-punio").disabled = false;
    document.getElementById("boton-patada").disabled = false;
    document.getElementById("boton-barrida").disabled = false;

    // Reiniciar variables de juego
    vidasJugador = 3;
    vidasEnemigo = 3;
    document.getElementById('vidas-jugador').innerHTML = vidasJugador;
    document.getElementById('vidas-enemigo').innerHTML = vidasEnemigo;
    document.getElementById('personaje-jugador').innerHTML = '';
    document.getElementById('personaje-enemigo').innerHTML = '';

    // Ocultar la sección de reiniciar
    document.getElementById('reiniciar').style.display = 'none';
    
     // Mostrar la sección de ataque
     document.getElementById('seleccionar-ataque').style.display = 'flex';

}

window.addEventListener('load', iniciarJuego)