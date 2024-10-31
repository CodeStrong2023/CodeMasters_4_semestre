// Array de personajes disponibles
let personajes = [
    { nombre: 'Zuko', img: 'IMAGENES/personajes-juego/Zuko.webp' },
    { nombre: 'Katara', img: 'IMAGENES/personajes-juego/katara.png' },
    { nombre: 'Aang', img: 'IMAGENES/personajes-juego/Aang.webp' },
    { nombre: 'Toph', img: 'IMAGENES/personajes-juego/toph.png' }
];

// Función para agregar un personaje
function agregarPersonaje(nombrePersonaje, imagenPersonaje) {
    personajes.push({ nombre: nombrePersonaje, img: imagenPersonaje });  //Código agregado por Juli
    renderizarPersonajes();
}

// Función para renderizar personajes en el DOM
function renderizarPersonajes() {
    const avataresDiv = document.querySelector('.avatares');
    avataresDiv.innerHTML = '';  // Limpiar contenido anterior

    personajes.forEach(personaje => {
        const personajeDiv = document.createElement('div');
        personajeDiv.classList.add('personaje');
        personajeDiv.innerHTML = `
            <input type="radio" name="personaje" id="${personaje.nombre.toLowerCase()}" required>
            <label for="${personaje.nombre.toLowerCase()}">
                <img src="${personaje.img}" alt="${personaje.nombre}" class="pixel-image">
                <span>${personaje.nombre}</span>
            </label>
        `;
        avataresDiv.appendChild(personajeDiv);
    });
}

// Agregar un nuevo personaje
agregarPersonaje('Iroh', 'IMAGENES/personajes-juego/iroh.png');

// Array de ataques disponibles
const ataques = ['Puño', 'Patada', 'Barrida'];

// Variables para almacenar el ataque del jugador y del enemigo
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    ocultarSeccion('seleccionar-ataque');
    ocultarSeccion('mensaje-final');
    ocultarSeccion('mensajes');

    renderizarPersonajes();

    // Añadir eventos a los botones
    document.getElementById('boton-personaje').addEventListener('click', seleccionarPersonajeJugador);
    document.getElementById('boton-punio').addEventListener('click', () => realizarAtaque('Puño'));
    document.getElementById('boton-patada').addEventListener('click', () => realizarAtaque('Patada'));
    document.getElementById('boton-barrida').addEventListener('click', () => realizarAtaque('Barrida'));
    document.getElementById('boton-reiniciar').addEventListener('click', reiniciarJuego);

    // Efecto de parpadeo para el título
    setInterval(() => {
        const titulo = document.querySelector('.titulo');
        titulo.style.opacity = titulo.style.opacity === '0' ? '1' : '0';
    }, 500);

    // Mostrar reglas del juego al hacer clic
    document.getElementById('boton-reglas').addEventListener('click', () => {
        const reglas = document.getElementById('reglas-juego');
        reglas.classList.toggle('hidden');
    });
}

function seleccionarPersonajeJugador() {
    const personajeSeleccionado = personajes.find(p => document.getElementById(p.nombre.toLowerCase()).checked);

    if (personajeSeleccionado) {
        document.getElementById('personaje-jugador').textContent = personajeSeleccionado.nombre;
        ocultarSeccion('seleccionar-personaje');
        mostrarSeccion('seleccionar-ataque');
        seleccionarPersonajeEnemigo();
    } else {
        mostrarMensaje('¡Debes seleccionar un personaje!', 'error');
    }
}

function seleccionarPersonajeEnemigo() {
    const personajeAleatorio = personajes[Math.floor(Math.random() * personajes.length)];
    document.getElementById('personaje-enemigo').textContent = personajeAleatorio.nombre;
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
}

function crearMensajeFinal(mensaje) {
    mostrarSeccion('mensaje-final');
    document.getElementById('resultado').textContent = mensaje;
    ocultarSeccion('seleccionar-ataque');
}

function reiniciarJuego() {
    location.reload();
}

function ocultarSeccion(id) {
    document.getElementById(id).classList.add('hidden');
}

function mostrarSeccion(id) {
    document.getElementById(id).classList.remove('hidden');
}

function mostrarMensaje(mensaje, tipo) {
    const divMensajes = document.getElementById('mensajes');
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add(tipo);
    mensajeDiv.textContent = mensaje;
    divMensajes.appendChild(mensajeDiv);
    mostrarSeccion('mensajes');
}

iniciarJuego();
