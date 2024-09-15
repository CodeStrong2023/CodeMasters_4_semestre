// Array de personajes disponibles
const personajes = ['Zuko', 'Katara', 'Aang', 'Toph'];
// Array de ataques disponibles
const ataques = ['Puño', 'Patada', 'Barrida'];

// Variables para almacenar el ataque del jugador y del enemigo
let ataqueJugador;
let ataqueEnemigo;
// Variables para almacenar las vidas del jugador y del enemigo
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    // Ocultar secciones iniciales
    ocultarSeccion('seleccionar-ataque');
    ocultarSeccion('mensaje-final');
    ocultarSeccion('mensajes');

    // Añadir eventos a los botones
    document.getElementById('boton-personaje').addEventListener('click', seleccionarPersonajeJugador);
    document.getElementById("boton-patada").addEventListener('click', () => realizarAtaque('Patada'));
    document.getElementById("boton-punio").addEventListener('click', () => realizarAtaque('Puño'));
    document.getElementById("boton-barrida").addEventListener('click', () => realizarAtaque('Barrida'));
    document.getElementById("boton-reiniciar").addEventListener('click', reiniciarJuego);
    document.getElementById("boton-reglas").addEventListener('click', toggleReglas);

    // Efecto de parpadeo para el título
    setInterval(() => {
        const titulo = document.querySelector('.titulo');
        titulo.style.opacity = titulo.style.opacity === '0' ? '1' : '0';
    }, 500);
}

function toggleReglas() {
    const reglas = document.getElementById('reglas-juego');
    const botonReglas = document.getElementById('boton-reglas');
    
    if (reglas.classList.contains('hidden')) {
        reglas.classList.remove('hidden');
        botonReglas.textContent = 'Ocultar Reglas';
    } else {
        reglas.classList.add('hidden');
        botonReglas.textContent = 'Mostrar Reglas';
    }
}

document.getElementById('boton-reglas').addEventListener('click', toggleReglas);


function ocultarSeccion(id) {
    document.getElementById(id).classList.add('hidden');
}

function mostrarSeccion(id) {
    document.getElementById(id).classList.remove('hidden');
}

function seleccionarPersonajeJugador() {
    const personajeSeleccionado = personajes.find(p => document.getElementById(p.toLowerCase()).checked);
    
    if (personajeSeleccionado) {
        document.getElementById('personaje-jugador').textContent = personajeSeleccionado;
        ocultarSeccion('seleccionar-personaje');
        mostrarSeccion('seleccionar-ataque');
        seleccionarPersonajeEnemigo();
    } else {
        mostrarMensaje('¡Debes seleccionar un personaje!', 'error');
    }
}

function seleccionarPersonajeEnemigo() {
    const personajeAleatorio = personajes[Math.floor(Math.random() * personajes.length)];
    document.getElementById('personaje-enemigo').textContent = personajeAleatorio;
}

function realizarAtaque(ataque) {
    ataqueJugador = ataque;
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    ataqueEnemigo = ataques[Math.floor(Math.random() * ataques.length)];
    combate();
}

function combate() {
    if (ataqueEnemigo === ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador === "Puño" && ataqueEnemigo === "Barrida") ||
        (ataqueJugador === "Patada" && ataqueEnemigo === "Puño") ||
        (ataqueJugador === "Barrida" && ataqueEnemigo === "Patada")
    ) {
        crearMensaje("GANASTE");
        vidasEnemigo--;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
    }

    actualizarVidas();
    revisarVidas();
}

function actualizarVidas() {
    document.getElementById('vidas-jugador').textContent = vidasJugador;
    document.getElementById('vidas-enemigo').textContent = vidasEnemigo;
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("¡Felicitaciones! HAS GANADO");
    } else if (vidasJugador === 0) {
        crearMensajeFinal("Lo siento, HAS PERDIDO");
    }
}

function crearMensaje(resultado) {
    const nuevoAtaqueDelJugador = document.createElement('p');
    const nuevoAtaqueDelEnemigo = document.createElement('p');
    
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;
    
    document.getElementById('ataques-del-jugador').appendChild(nuevoAtaqueDelJugador);
    document.getElementById('ataques-del-enemigo').appendChild(nuevoAtaqueDelEnemigo);
    
    const mensajeResultado = document.createElement('p');
    mensajeResultado.innerHTML = `Tu ${ataqueJugador} VS ${ataqueEnemigo} del enemigo - ${resultado}`;
    document.getElementById('mensajes').appendChild(mensajeResultado);
    
    mostrarSeccion('mensajes');
}

function crearMensajeFinal(resultado) {
    document.getElementById('resultado').innerHTML = resultado;
    
    mostrarSeccion('mensaje-final');
    ocultarSeccion('seleccionar-ataque');
}

function reiniciarJuego() {
    location.reload();
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeElement = document.createElement('div');
    mensajeElement.textContent = mensaje;
    mensajeElement.classList.add('mensaje', tipo);
    document.body.appendChild(mensajeElement);
    
    setTimeout(() => {
        mensajeElement.remove();
    }, 3000);
}

window.addEventListener('load', iniciarJuego);