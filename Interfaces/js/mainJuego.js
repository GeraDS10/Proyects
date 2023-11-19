"use strict";

const PERSONAJES_DC = new Map([
    ['superman', '../imagenes/personajes/superman.jpg'],
    ['batman', '../imagenes/personajes/batman.jpg'],
    ['flash', '../imagenes/personajes/flash.jpg'],
    ['aquaman', '../imagenes/personajes/aquaman.jpg'],
    ['wonderWoman', '../imagenes/personajes/wonder_woman.jpg']
  ]);
const PERSONAJES_MARVEL = new Map([
    ['spiderman', '../imagenes/personajes/spiderman.jpg'],
    ['ironMan', '../imagenes/personajes/iron_man.jpg'],
    ['captainAmerica', '../imagenes/personajes/captain_america.jpg'],
    ['thor', '../imagenes/personajes/thor.jpg'],
    ['hulk', '../imagenes/personajes/hulk.jpg']
  ]);
  
const btnJugar = document.getElementById("btn_jugar");
const espacioJuego = document.getElementById("espacio_juego");
const espacioCanvas = document.querySelector(".canbas");

const selectorEquipos = document.getElementById("selectorEquipos");
let equipo1, equipo2, fichaDC, fichaMARVEL;

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let jugador1, jugador2, jugadorTurno, tablero, cantidadFichas;
let lastClicledFigure = null;
let isMouseDown = false;
let isGameOver = false;


let tiempoInicial = 5 * 60;
const temporizadorDiv = document.getElementById("temporizador");
let tiempoRestante, temporizador;

const btniniciar = document.getElementById("btnIniciar");
const btnReiniciar = document.getElementById("btn_reiniciar");
let mostrarGanador = document.getElementById("mostrarGanador");
btnJugar.addEventListener('click', mostrarSelectores);


//Da inicio al temporizador, reiniciando el juego una vez transcurrido el tiempo restante
function iniciarTemporizador() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    const tiempoFormateado = minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
    temporizadorDiv.querySelector("h2").textContent = tiempoFormateado;

    if (tiempoRestante > 0) {
        tiempoRestante--;
        temporizador = setTimeout(iniciarTemporizador, 1000);
    } else {
        temporizadorDiv.querySelector("h2").textContent = "Tiempo agotado";
        setTimeout(reiniciarJuego, 1000);
    }
}

// Muestras selectores de superheroes
function mostrarSelectores(){
    btnJugar.classList.add("ocultar");
    espacioCanvas.classList.remove("ocultar");
    selectorEquipos.classList.add("mostrar_selector");
    btniniciar.addEventListener('click', eleccionEquipos);
}

// toma los valores de los select y asigna la fuente de las 
// imagenes correspondientes para dar inicio al juego
function eleccionEquipos(){
     equipo1 = document.getElementById("equipo1").value;
     equipo2 = document.getElementById("equipo2").value;
    fichaDC = PERSONAJES_DC.get(equipo1);
    fichaMARVEL = PERSONAJES_MARVEL.get(equipo2);
    cantidadFichas = document.getElementById("fichasLinea").value;

    if(equipo1 != equipo2){
        canvas.classList.add("mostrar_canvas")

        selectorEquipos.classList.remove("mostrar_selector");
            abrirJuego(cantidadFichas);
        
    }
    else{
        mostrarSelectores()
    }   
}

//Muestra el equipo ganador y detiene el temporizador
function cerrarJuego(ganador){
    isGameOver = true;
    clearTimeout(temporizador);
    mostrarGanador.children[0].innerHTML = "Ganador: " + ganador.getNombre();
    mostrarGanador.classList.remove("ocultar");
}


//inicia el juego determinando las dimensiones del tablero y las dimensiones de la ficha a partir de la altura del tablero
function abrirJuego(cantidad){
    selectorEquipos.classList.add("ocultar");
    let fichasLinea = cantidad;
    let fichasTablero = ((fichasLinea * 2) * (fichasLinea * 2));
    let tableroPosX = canvasWidth * 0.15;
    let tableroPosY = canvasHeight * 0.10;
    let tableroWidth = canvasWidth * 0.70
    let tableroHeight = canvasHeight * 0.70
    let diametroFicha = tableroHeight / (fichasLinea * 2 + 1);
    let radioFicha = diametroFicha / 2;

    jugador1 = new Jugador("DC", radioFicha, (canvasWidth * 0.05), (canvasHeight *0.15), fichaDC, ctx);
    jugador2 = new Jugador("MARVEL", radioFicha, (canvasWidth * 0.95), (canvasHeight *0.15), fichaMARVEL, ctx);
    tablero = new Tablero(
        (tableroPosX), (tableroPosY), (tableroWidth),(tableroHeight), "blue", ctx, fichasLinea);
    jugador1.agregarFicha(fichasTablero / 2);
    jugador2.agregarFicha(fichasTablero / 2);
    setTurno(jugador1);
    btnReiniciar.classList.remove("ocultar");
    btnReiniciar.addEventListener("click", reiniciarJuego)
    temporizadorDiv.classList.remove("ocultar");
    tiempoRestante = tiempoInicial;
    iniciarTemporizador();
}


//Reinicia el juego permitiendo elegir nuevamente los superheroes
function reiniciarJuego(){
    isGameOver = false;
    selectorEquipos.classList.remove("ocultar");
    selectorEquipos.classList.add("mostrar_selector");
    canvas.classList.remove("mostrar_canvas")
    clearTimeout(temporizador);
    temporizadorDiv.classList.add("ocultar");
    btnReiniciar.classList.add("ocultar");
    mostrarGanador.classList.add("ocultar");
}

//Define el jugador poseedor del turno
function setTurno(jugador){
    jugadorTurno = jugador;
}

//Permite obtener el jugador poseedor del turno
function getJugadorTurno(){
    if(jugadorTurno != null){
        return jugadorTurno;
    }
}

//Envia a limpiar el canvas para volver a dibujarlo
function drawFigure(){
    clearCanvas();
    tablero.draw();
    tablero.dibujarFichasTablero();
    jugador1.dibujarFichas();
    jugador2.dibujarFichas();
}

//Obtiene las coordenadas del cursor en el momento del click ajustadas al canvas y determina si hay una ficha factbible de mover
function onMouseDown(e){
    if(!isGameOver){
        isMouseDown = true;
        const rect = canvas.getBoundingClientRect(); 
        let posX = e.clientX - rect.left;
        let posY = e.clientY - rect.top; 
        if(lastClicledFigure == null){
            let clickFig = findClickedFigure(posX, posY);
            if((clickFig != null) && (clickFig.isFixed() == false)){
                clickFig.setResaltado(true);
                lastClicledFigure = clickFig;
            }
            drawFigure();
        }    
    }   
}

//Limpia el rectangulo del canvas y lo rellena con un color de fondo
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(32,1,49,1)';
    ctx.fillRect(0,0, canvasWidth, canvasHeight);
}

//Al momento de levantar el click del mouse determina las coordenadas ajustadas al canvas y verifica si 
//en caso de tener seleccionada una ficha es factible fijarla en dicho lugar y posteriormente llama metodos
//del objeto tablero para determinar si existe un ganador
function onMouseUp(e){
    if(!isGameOver){
        isMouseDown = false;
        const rect = canvas.getBoundingClientRect();
        let posX = e.clientX - rect.left; 
        let posY = e.clientY - rect.top; 
    
        if((lastClicledFigure != null)&&(tablero.isOnTablero(posX, posY))){
            let circleTablero = tablero.findAvailable(posX);
            if(circleTablero != null){
                tablero.fijarFicha(lastClicledFigure, circleTablero.getPosX(), circleTablero.getPosY());
                lastClicledFigure.setResaltado(false);
                lastClicledFigure = null;
                drawFigure();
                tablero.lineaVertical(jugador1, jugador2);
                tablero.lineaHorizontal(jugador1, jugador2);
                tablero.lineaOblicuoDescendenteDerecha(jugador1, jugador2);
                tablero.lineaOblicuoDescendenteIzquierda(jugador1, jugador2);
                tablero.lineaOblicuoAscendenteIzquierda(jugador1, jugador2);
                tablero.lineaOblicuoAscendenteDerecha(jugador1, jugador2);
                if(tablero.getGanador() != null){
                    cerrarJuego(tablero.getGanador());
                }
    
                if(getJugadorTurno() == jugador1){
                    // jugador1.agregarFicha();
                    setTurno(jugador2)
                }else{
                    // jugador2.agregarFicha();
                    setTurno(jugador1);
                }
            
            }
        }
            
        drawFigure();
    }
   
}

//Determina las coordenadas del cursor ajustadas al canvas al detectar movimiento del mismo y traslada la figura en caso de tener una seleccionada
function onMouseMove(e){
    if(!isGameOver){
        if(isMouseDown && lastClicledFigure != null){
            const rect = canvas.getBoundingClientRect(); 
            let posX = e.clientX - rect.left; 
            let posY = e.clientY - rect.top; 
            lastClicledFigure.setPosition(posX, posY);
            drawFigure();
        }
    }
}

//Determina a partir de las coordenadas recibidas y el jugador poseedor del turno si encuentra una ficha factible de seleccionar
function findClickedFigure(x, y){
    let fichas = getJugadorTurno().obtenerFichas();
    for(let i = 0; i < fichas.length; i++){
        const element = fichas[i];
        console.log(element);
        if(element.isPointInside(x, y)){
            return element;
        }
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);