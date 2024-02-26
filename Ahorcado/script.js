const palabraContainer = document.getElementById('containerPalabra');
const botonJugar = document.getElementById('botonJugar');
const letrasUsadasElemento = document.getElementById('letrasUsadas');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const partesCuerpo = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let palabraSeleccionada;
let letrasUsadas;
let errores;
let aciertos;

const añadirLetras = letra => {
    const letraElemento = document.createElement('span');
    letraElemento.innerHTML = letra.toUpperCase();
    letrasUsadasElemento.appendChild(letraElemento);
}

const añadirParteCuerpo = parteCuerpo => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...parteCuerpo);
};

const errorLetra = () => {
    añadirParteCuerpo(partesCuerpo[errores]);
    errores++;
    if(errores === partesCuerpo.length) finalJuego();
}

const finalJuego = () => {
    document.removeEventListener('keydown', letraEvento);
    botonJugar.style.display = 'block';
}

const letraCorrecta = letra => {
    const { children } =  palabraContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letra) {
            children[i].classList.toggle('hidden');
            aciertos++;
        }
    }
    if(aciertos === palabraSeleccionada.length) finalJuego();
}

const letraInput = letra => {
    if(palabraSeleccionada.includes(letra)) {
        letraCorrecta(letra);
    } else {
        errorLetra();
    }
    añadirLetras(letra);
    letrasUsadas.push(letra);
};

const letraEvento = evento => {
    let letraNueva = evento.key.toUpperCase();
    if(letraNueva.match(/^[a-zñ]$/i) && !letrasUsadas.includes(letraNueva)) {
        letraInput(letraNueva);
    };
};

const dibujarPalabra = () => {
    palabraSeleccionada.forEach(letra => {
        const letraElemento = document.createElement('span');
        letraElemento.innerHTML = letra.toUpperCase();
        letraElemento.classList.add('letra');
        letraElemento.classList.add('hidden');
        palabraContainer.appendChild(letraElemento);
    });
};

const palabraRandom = () => {
    let palabra = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();
    palabraSeleccionada = palabra.split('');
};

const dibujarAhorcado = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#black';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const jugar = () => {
    letrasUsadas = [];
    errores = 0;
    aciertos = 0;
    palabraContainer.innerHTML = '';
    letrasUsadasElemento.innerHTML = '';
    botonJugar.style.display = 'none';
    dibujarAhorcado();
    palabraRandom();
    dibujarPalabra();
    document.addEventListener('keydown', letraEvento);
};

botonJugar.addEventListener('click', jugar);