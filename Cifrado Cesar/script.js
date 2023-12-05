const alfabeto = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
]

const inputOriginal = document.getElementById('input-original')
const resultado = document.getElementById('resultado')
const rango = document.getElementById('rango')
const cifrador = document.getElementById('cifrador')

const shifMessage = () => {
    const wordArray = [...inputOriginal.value.toUpperCase()];
    printChar(0, wordArray);
}

const printChar = (i, wordArray) => {
    if (wordArray.length === i) {
        return;
    }
    inputOriginal.value = inputOriginal.value.substring(1);
    const spanChar = document.createElement('span');
    resultado.appendChild(spanChar);
    animateChar(spanChar).then(() => {
        const charSinCodificar = wordArray[i];
        spanChar.innerHTML = alfabeto.includes(charSinCodificar) ?
            alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length] : charSinCodificar;
        printChar(i + 1, wordArray);
    })
}

const submit = e => {
    e.preventDefault()
    resultado.innerHTML = '';
    shifMessage();
}

const animateChar = spanChar => {
    let cambios = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambios++;
            if (cambios === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50)
    })
}

cifrador.onsubmit = submit;