"use strict";

document.addEventListener('DOMContentLoaded', function() {
    let pageTitle = document.querySelector('title');
    let title = pageTitle.textContent;
    if(title == 'Inicio'){
        let porcentajeCarga = document.querySelector(".porcentaje_loader");
    let porcentaje = 20;
    let tiempoTranscurrido = 0;
    const intervalo = setInterval(function() {
        porcentajeCarga.innerHTML = porcentaje + "%";
        porcentaje += 20;
        tiempoTranscurrido++;
        if (tiempoTranscurrido >= 6) {
            let loader = document.querySelector("#loader");
            if(loader){
            loader.classList.add("ocultar_loader");
            }
            clearInterval(intervalo);
        }
    }, 1000);
    }
});

let posicionActualSugeridos = 0;
let posicionActualMultijugador = 0;
let posicionActualAccion = 0;

let limite_carrusel_izquierda = 0;
let limite_carrusel_derecha = -50;
let btn_recomendados_izquierda = document.querySelector("#btn_recomendados_carrusel_izquierda");
let btn_multijugador_izquierda = document.querySelector("#btn_multijugador_carrusel_izquierda");
let btn_accion_izquierda = document.querySelector("#btn_accion_carrusel_izquierda");

let cards_recomendados = document.querySelectorAll(".cards_recomendados");
let cards_multijugador = document.querySelectorAll(".cards_multijugador");
let cards_accion = document.querySelectorAll(".cards_accion");
let link_juego = document.querySelector("#link_juego");
if(link_juego){
    link_juego.addEventListener('click', () =>{
        console.log("sarasa");
        let nuevaURL = "../html/juego.html"
        window.location.href = nuevaURL;
    })
}
function cardsSkewAdd(lista_cards){
    lista_cards.forEach(card=>
        card.classList.add('skewed'));
}

function cardsSkewRemove(lista_cards){
    console.log("Quitando skew");
    lista_cards.forEach(card =>
        card.classList.remove('skewed'));
}
if(btn_recomendados_izquierda){
    btn_recomendados_izquierda.addEventListener("click", (e) => {
        let carrusel_recomendados = document.querySelector("#carrusel_recomendados");
        if (posicionActualSugeridos < limite_carrusel_izquierda) {
            cardsSkewAdd(cards_recomendados);
            posicionActualSugeridos += (50/3);
            carrusel_recomendados.style.transform = "translateX(" + posicionActualSugeridos + "%)";
            setTimeout(function() {
                cardsSkewRemove(cards_recomendados);
            }, 700);
          } else{
            carrusel_recomendados.classList.add('bounce_left');
            setTimeout(function() {
                carrusel_recomendados.classList.remove("bounce_left");
            }, 800);
          }
    });
}

if(btn_multijugador_izquierda){
    btn_multijugador_izquierda.addEventListener("click", (e) => {
        let carrusel_multijugador = document.querySelector("#carrusel_multijugador");
        if (posicionActualMultijugador < limite_carrusel_izquierda) {
            cardsSkewAdd(cards_multijugador);
            posicionActualMultijugador += (50/3);
            carrusel_multijugador.style.transform = "translateX(" + posicionActualMultijugador + "%)";
            setTimeout(function() {
                cardsSkewRemove(cards_multijugador);
            }, 700);
          } else{
            carrusel_multijugador.classList.add('bounce_left');
            setTimeout(function() {
                carrusel_multijugador.classList.remove("bounce_left");
            }, 800);
          }
    });
}

if(btn_accion_izquierda){
    btn_accion_izquierda.addEventListener("click", (e) => {
        let carrusel_accion = document.querySelector("#carrusel_accion");
        if (posicionActualAccion < limite_carrusel_izquierda) {
            cardsSkewAdd(cards_accion);
            posicionActualAccion += (50/3);
            carrusel_accion.style.transform = "translateX(" + posicionActualAccion + "%)";
            setTimeout(function() {
                cardsSkewRemove(cards_accion);
            }, 700);
          } else{
            carrusel_accion.classList.add('bounce_left');
            setTimeout(function() {
                carrusel_accion.classList.remove("bounce_left");
            }, 800);
          }
    });
}

let btn_recomendados_derecha = document.querySelector("#btn_recomendados_carrusel_derecha");
if(btn_recomendados_derecha){
btn_recomendados_derecha.addEventListener("click", (e) => {
    console.log(posicionActualSugeridos);
    let carrusel_recomendados = document.querySelector("#carrusel_recomendados");
    if (posicionActualSugeridos > limite_carrusel_derecha) {
        cardsSkewAdd(cards_recomendados);
        posicionActualSugeridos -= (50/3);
        carrusel_recomendados.style.transform = "translateX(" + posicionActualSugeridos + "%)";
        setTimeout(function() {
            cardsSkewRemove(cards_recomendados);
        }, 700);
      } else{
        carrusel_recomendados.classList.add('bounce_right');
        setTimeout(function() {
            carrusel_recomendados.classList.remove("bounce_right");
        }, 800);
      }
});
}

let btn_multijugador_derecha = document.querySelector("#btn_multijugador_carrusel_derecha");
if(btn_multijugador_derecha){
    btn_multijugador_derecha.addEventListener("click", (e) => {
    console.log(posicionActualMultijugador);
    let carrusel_multijugador = document.querySelector("#carrusel_multijugador");
    if (posicionActualMultijugador > limite_carrusel_derecha) {
        cardsSkewAdd(cards_multijugador);
        posicionActualMultijugador -= (50/3);
        carrusel_multijugador.style.transform = "translateX(" + posicionActualMultijugador + "%)";
        setTimeout(function() {
            cardsSkewRemove(cards_multijugador);
        }, 700);
      } else{
        carrusel_multijugador.classList.add('bounce_right');
        setTimeout(function() {
            carrusel_multijugador.classList.remove("bounce_right");
        }, 800);
      }
});
}

let btn_accion_derecha = document.querySelector("#btn_accion_carrusel_derecha");
if(btn_accion_derecha){
    btn_accion_derecha.addEventListener("click", (e) => {
    console.log(posicionActualAccion);
    let carrusel_accion = document.querySelector("#carrusel_accion");
    if (posicionActualAccion > limite_carrusel_derecha) {
        cardsSkewAdd(cards_accion);
        
        console.log("moviendo derecha");
        posicionActualAccion -= (50/3);
        carrusel_accion.style.transform = "translateX(" + posicionActualAccion + "%)";
        setTimeout(function() {
            cardsSkewRemove(cards_accion);
        }, 700);
      } else{
        carrusel_accion.classList.add('bounce_right');
        setTimeout(function() {
            carrusel_accion.classList.remove("bounce_right");
        }, 800);
      }
});
}


let btn_registrar = document.querySelector("#btn_registrar");
if(btn_registrar){
    btn_registrar.addEventListener("click",(event) => {
        console.log("sarasa");
        event.preventDefault();
        mensajeExitoso();
    });

}

 function mensajeExitoso () {
    console.log("mostrar mensaje");
    let mensajeExitoso = document.querySelector(".registro_exitoso_mensaje");
    mensajeExitoso.classList.add("mostrar_mensaje");
    setTimeout(function () {
        mostrarMensajeDeExito();
    }, 2000);
    function mostrarMensajeDeExito() {
        setTimeout(function () {
        }, 3000);
        window.location.href = "../html/inicio.html";
    }
};

let btn_menu_hamburguesa = document.querySelector("#botonMenuHamburguesa");
btn_menu_hamburguesa.addEventListener('click', menuHamburguesa);

let btn_menu_perfil = document.querySelector("#botonPerfil");

btn_menu_perfil.addEventListener('click', menuPerfil);

function menuPerfil(){
    let menu_perfil = document.querySelector("#container_nav_perfil");
    menu_perfil.classList.toggle("mostrar_nav_perfil");
}

function menuHamburguesa(){
    let menuCategorias = document.querySelector("#container_nav");
    menuCategorias.classList.toggle("mostrar_nav");
}
