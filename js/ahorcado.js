// *** JUEGO AHORCADO ***

// *** VARIABLES ***
var palabras = ["universidad", "ordenador", "laurel", "videojuego", "rueda", "motocicleta", "albañil", "cartagena", "invierno",
	"septiembre", "verano", "veneno", "almohada", "bicicleta", "geranio", "amapola", "ventilador", "restaurante", "montaña",
	"laguna", "calamar", "mosaico", "piedra", "refugio", "senador", "varicela", "ciervo", "rotulador", "suelo", "submarino",
	"niñero", "muñeca", "calabaza", "armario", "tarjeta", "empresa", "ingrediente", "ametralladora", "adivino", "escritorio",
	"horizonte", "tostadora", "carnicero", "zafiro", "ambulancia", "nublado", "enfermero", "carambola", "migraña", "hormiga",
	"sonrisa", "radiador", "combustible", "peldaño", "trastero", "bombero", "vestidor", "esqueleto", "cerbatana", "soldado"];
  
var palabra = ""; 
var rand; 
var oculta = []; 
var cont = 6; 
var hueco = document.getElementById("palabra"); 
var buttons = document.getElementsByClassName('letra'); 
var btnInicio = document.getElementById("reset");
var rightAudio = new Audio("sfx/right.wav");
var wrongAudio = new Audio("sfx/wrong.wav");

// *** FUNCIONES ***
function inicio() {
    generaPalabra();
    pintarGuiones(palabra.length);
    generaABC("a", "z");
    document.getElementById("intentos").innerHTML = cont;  
}

function generaPalabra() {
    rand = Math.round(Math.random() * (palabras.length - 1)); 
    palabra = palabras[rand].toUpperCase();
}

function pintarGuiones(num) {
    oculta = []; // Limpiar el array de la palabra oculta
    for (var i = 0; i < num; i++) {
        oculta[i] = "-"; // Colocar un guion en cada letra de la palabra
    }
    hueco.innerHTML = oculta.join(" "); // Mostrar los guiones bajos separados por espacios
}

function generaABC(a, z) {
    document.getElementById("abcdario").innerHTML = "";
    var i = a.charCodeAt(0);
    var j = z.charCodeAt(0);
    var letra = "";
    for (i; i <= j; i++) {
        letra = String.fromCharCode(i).toUpperCase();
        document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='" + letra + "'>" + letra + "</button>";
        if (i == 110) {
            document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='" + 'Ñ' + "'>Ñ</button>";
        }
    }
}

function intento(letra) {
    document.getElementById(letra).disabled = true;
    var acertado = false;
    for (var i = 0; i < palabra.length; i++) {
        if (palabra[i] == letra) {
            oculta[i] = letra; // Reemplazar el guion con la letra correcta
            acertado = true;
        }
    }
    if (acertado) {
        rightAudio.play();
        mostrarGif("../img/gifacierto.gif");
    } else {
        if (cont > 0) {  // Esto asegura que cont no se haga negativo
            cont--;
            document.getElementById("intentos").innerHTML = cont;
            wrongAudio.play();
            mostrarGif("../img/giffallo.gif");
        }
    }
    hueco.innerHTML = oculta.join(" "); // Actualizar la visualización de la palabra oculta
    compruebaFin();
}

function mostrarGif(src) {
    var gifContainer = document.getElementById("fullscreenGif");
    var gifImage = document.getElementById("gifImage");
    gifImage.src = src;
    gifContainer.style.display = "flex";
    setTimeout(function () {
        gifContainer.style.display = "none";
    }, 3000);
}

function compruebaFin() {
    if (oculta.indexOf("-") == -1) {
        document.getElementById("msg-final").innerHTML = "¡¡¡Enhorabuena!!! Sobreviviste ;)";
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    } else if (cont == 0) {
        document.getElementById("msg-final").innerHTML = "Game Over :(";
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }      
}

btnInicio.onclick = function () { location.reload() };
