"use strict";


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

document.addEventListener('DOMContentLoaded', function() {
    let porcentajeCarga = document.querySelector(".porcentaje_loader");
    let porcentaje = 20;
    let tiempoTranscurrido = 0;
    const intervalo = setInterval(function() {
        porcentajeCarga.innerHTML = porcentaje + "%";
        porcentaje += 20;
        tiempoTranscurrido++;
        if (tiempoTranscurrido >= 5) {
            let loader = document.querySelector("#loader");
            if(loader){
            loader.classList.add("ocultar_loader");
            }
            clearInterval(intervalo);
            console.log('Se han completado 5 segundos.');
        }
    }, 1000);
});




function carruselUnaCard() {
    const prevBtn = document.getElementById("btn_carrusel_izquierda_mobile");
    const nextBtn = document.getElementById("btn_carrusel_derecha_mobile");
    const cardContainer = document.querySelector(".carrusel_mobile");

    const cardsData = [
        {
            imgSrc: "../imagenes/cards/accion/Hunt.jpg",
            nombre: "Hunt",
            precio: "",
            etiqueta: "Gratis",
        },
        {
            imgSrc: "../imagenes/marvel_vs_dc.png",
            nombre: "Marvel vs DC",
            precio: "",
            etiqueta: "Gratis",
        },
        {
            imgSrc: "../imagenes/cards/accion/halo_infinite.jpg",
            nombre: "Halo Infinite",
            precio: "",
            etiqueta: "Agregado",
        },
        {
            imgSrc: "../imagenes/cards/accion/warzone.jpg",
            nombre: "Warzone",
            precio: "",
            etiqueta: "$49",
        },
        {
            imgSrc: "../imagenes/cards/accion/Wolcen.jpg",
            nombre: "Wolcen",
            precio: "",
            etiqueta: "Gratis",
        },
    ];

    let currentIndex = 0;

    function updateCarousel() {
        const cardContainer = document.querySelector(".carrusel_mobile");
        const cardData = cardsData[currentIndex];

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = cardData.imgSrc;
        img.alt = "";
        img.classList.add("img_card");

        const nombre = document.createElement("h3");
        nombre.textContent = cardData.nombre;
        nombre.classList.add("nombre_card");

        const precio = document.createElement("p");
        precio.textContent = cardData.precio;
        precio.classList.add("precio_card");

        const btnJugar = document.createElement("button");
        if (cardData.etiqueta === "Gratis") {
            btnJugar.textContent = "Jugar";
        } else if (cardData.etiqueta.includes("$") || cardData.etiqueta === "Agregado") {
            btnJugar.textContent = "Comprar";
        }
        btnJugar.classList.add("btn_card");

        const containerEtiqueta = document.createElement("div");
        const etiqueta = document.createElement("p");
        etiqueta.textContent = cardData.etiqueta;

        if (cardData.etiqueta === "Gratis") {
            containerEtiqueta.classList.add("container_etiqueta_card_gratis");
        } else if (cardData.etiqueta.startsWith("$")) {
            containerEtiqueta.classList.add("container_etiqueta_card_comprar");
        } else if (cardData.etiqueta === "Agregado") {
            containerEtiqueta.classList.add("container_etiqueta_card_agregado");
        }

        etiqueta.classList.add("etiqueta_card");

        card.appendChild(img);
        card.appendChild(nombre);
        card.appendChild(precio);
        card.appendChild(btnJugar);
        containerEtiqueta.appendChild(etiqueta);
        card.appendChild(containerEtiqueta);

        cardContainer.innerHTML = ""; 
        cardContainer.appendChild(card);

        if (cardData.nombre === "Marvel vs DC") {
            btnJugar.setAttribute("id", "ir_juego");
        }
        let btn_ir_juego = document.querySelector("#ir_juego");
            if(btn_ir_juego){
                btn_ir_juego.addEventListener("click", () =>{                        
                    let nuevaURL = "../html/juego.html"
                    window.location.href = nuevaURL;
                })
            }
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < cardsData.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    updateCarousel();
    console.log("Carrusel de 1 card por carrusel");
}

function carruselTresCards() {
    console.log("Carrusel de 3 cards por carrusel");
    const prevBtn = document.getElementById("btn_carrusel_izquierda");
    const nextBtn = document.getElementById("btn_carrusel_derecha");

    const cardsData = [
        {
            imgSrc: "../imagenes/cards/sugeridos/mario_bros.jpg",
            nombre: "Mario Bros",
            precio: "",
            etiqueta: "$99",
        },
        {
            imgSrc: "../imagenes/cards/sugeridos/mortal_kombat.jpg",
            nombre: "Mortal Kombat",
            precio: "",
            etiqueta: "Agregado",
        },
        {
            imgSrc: "../imagenes/cards/accion/bioshock.jpg",
            nombre: "Bioshock",
            precio: "",
            etiqueta: "Gratis",
        },
        {
            imgSrc: "../imagenes/cards/accion/dead_space.jpg",
            nombre: "Dead Space",
            precio: "",
            etiqueta: "$89",
        },
        {
            imgSrc: "../imagenes/cards/accion/farcry_4.jpg",
            nombre: "Farcry 4",
            precio: "",
            etiqueta: "Agregado",
        },
        {
            imgSrc: "../imagenes/cards/accion/freeguy.jpg",
            nombre: "Free Guy",
            precio: "",
            etiqueta: "Gratis",
        },
        {
            imgSrc: "../imagenes/marvel_vs_dc.png",
            nombre: "Marvel vs DC",
            precio: "",
            etiqueta: "Gratis",
        },
    ];

    let currentIndex = 0;

    function updateCarousel() {
        const cardContainer = document.querySelector(".carrusel_desktop");
        cardContainer.innerHTML = ""; 

        for (let i = currentIndex; i < currentIndex + 3; i++) {
            const cardData = cardsData[i % cardsData.length];
            if (cardData) {
                const card = document.createElement("div");
                card.classList.add("card");

                const img = document.createElement("img");
                img.src = cardData.imgSrc;
                img.alt = "";
                img.classList.add("img_card");

                const nombre = document.createElement("h3");
                nombre.textContent = cardData.nombre;
                nombre.classList.add("nombre_card");

                const precio = document.createElement("p");
                precio.textContent = cardData.precio;
                precio.classList.add("precio_card");

                const btnJugar = document.createElement("button");
                
                if (cardData.etiqueta === "Gratis" ) {
                    btnJugar.textContent = "Jugar";
                } else if (cardData.etiqueta.includes("$") || cardData.etiqueta === "Agregado") {
                    btnJugar.textContent = "Comprar";
                }
                
                btnJugar.classList.add("btn_card");

                const containerEtiqueta = document.createElement("div");
                const etiqueta = document.createElement("p");
                etiqueta.textContent = cardData.etiqueta;

                if (cardData.etiqueta === "Gratis") {
                    containerEtiqueta.classList.add("container_etiqueta_card_gratis");
                } else if (cardData.etiqueta.startsWith("$")) {
                    containerEtiqueta.classList.add("container_etiqueta_card_comprar");
                } else if (cardData.etiqueta === "Agregado") {
                    containerEtiqueta.classList.add("container_etiqueta_card_agregado");
                }

                etiqueta.classList.add("etiqueta_card");

                card.appendChild(img);
                card.appendChild(nombre);
                card.appendChild(precio);
                card.appendChild(btnJugar);
                containerEtiqueta.appendChild(etiqueta);
                card.appendChild(containerEtiqueta);

                cardContainer.appendChild(card);

                if (cardData.nombre === "Marvel vs DC") {
                    btnJugar.setAttribute("id", "ir_juego");
                }
                let btn_ir_juego = document.querySelector("#ir_juego");
                    if(btn_ir_juego){
                        btn_ir_juego.addEventListener("click", () =>{                        
                            let nuevaURL = "../html/juego.html"
                            window.location.href = nuevaURL;
                        })
                    }

                
            }
        }
    }

    nextBtn.addEventListener("click", () => {
        console.log("sarasa")
        currentIndex++;
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        console.log("sarasas")
        currentIndex--;
        updateCarousel();
    });

    updateCarousel();

}
const anchoDispositivo = window.innerWidth;

const umbralAncho = 600; 
if (anchoDispositivo <= umbralAncho) {
    carruselUnaCard();
} else {
    carruselTresCards();
}
