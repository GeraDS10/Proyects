"use strict";



//------------- menu ----------------
document.querySelector("#menu").addEventListener("click", deslizar);
let navMenu = document.querySelector("#navMenu");
let imgMenu = document.querySelector("#menu");

function deslizar(){
    navMenu.classList.toggle("deslizar");
    cambiarImgMenu();
};

function cambiarImgMenu(){
   if(imgMenu.alt == "menu"){
    imgMenu.src = "../Guarderia_&_Peluqueria/images/menuClose.png";
    imgMenu.alt = "menuClose";
   }
   else{
    imgMenu.src = "../Guarderia_&_Peluqueria/images/menu.png";
    imgMenu.alt = "menu";
   }
}

let logo = document.querySelector("#logo").addEventListener("click",()=>{
    let id = "inicio";
    document.title = id;
    load_content(id);
    imgMenu = document.querySelector("#menu");
    console.log(imgMenu.alt);
    if(imgMenu.alt == "menuClose"){
        console.log("Logo Click")
        deslizar();
    }
    window.history.pushState(id, `${id}`,`./${id}.html`);
});


//------------------PARTIAL RENDER---------------------------------------------
async function load_content(id) {
    let conteiner = document.querySelector("#content");
    try{
        let response = await fetch(`./${id}.html`);
        if (response.ok){
            let text = await response.text();
            conteiner.innerHTML = text;
        }else{
        let id = "inicio";
        document.title = id;
        load_content(id);
        window.history.pushState(id, `${id}`,`./${id}.html`);
        }
    }catch(error){
        console.log(error);
    }
    if(id === 'guarderia'){
         estadia();
    }
    if(id === 'peluqueria'){
        baño();
    }
}




function push(event) {
    if(imgMenu.alt = "menuClose"){
        deslizar();
    }
    let id = event.target.id;
    document.title = id;
    load_content(id);
    window.history.pushState(id, `${id}`,`./${id}.html`);
}

window.onload = event => {
    window["inicio"].addEventListener("click", event => push(event));
    window["guarderia"].addEventListener("click", event => push(event));
    window["peluqueria"].addEventListener("click", event => push(event));
}

window.addEventListener("popstate", event => {

    let stateId = event.state;
    load_content(stateId);
});

/*
-------------PARTIAL RENDER
*/
function estadia(){
    let valorEstadia;
    const url = 'https://64e0b77950713530432c98b8.mockapi.io/api/peluqueria/Guarderia';
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error de red - Código de estado: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        valorEstadia = data[0].valorEstadia;
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
    let btnConsulta = document.querySelector("#buttonConsultar").addEventListener("click", calcular);
    let divResultado = document.querySelector("#resultadoDiv");

    function calcularAdicional(horaEgreso){
        if(( horaEgreso > '14:00') && ( horaEgreso < '19:00' )){
            return valorEstadia * 0.5;
        }
        if(horaEgreso >= '19:00'){
            return valorEstadia;
        }
        else{
            return 0;
        }
    }
    
    
    function calcular(){
        let fechaIngreso = document.querySelector("#fechaIngreso").value;
        let fechaEgreso = document.querySelector("#fechaEgreso").value;
        let horaEgreso = document.querySelector("#horaEgreso").value;
        let diasEstadia = calcularDiferenciaEnDias(fechaIngreso, fechaEgreso);
        let adicionalDia = 0;
        let limitePrecio = '<br> <p  class="aclaracion"></p>';
        if(horaEgreso >= '00:00'){
            adicionalDia = calcularAdicional(horaEgreso);
            if(diasEstadia > 0){
                divResultado.innerHTML = "Valor Estadia = $" + (diasEstadia * valorEstadia + adicionalDia) + limitePrecio;
            }
            else if(diasEstadia == 0){
                divResultado.innerHTML = "Valor Estadia = $" + (valorEstadia + adicionalDia) + limitePrecio;
            }
            else{
                divResultado.innerHTML = "Fechas inválidas, intente nuevamente";    
            }
        }
        else{
            divResultado.innerHTML = "Horario de egreso inválido, intente nuevamente";    
        }
        
        divResultado.classList.remove("ocultar");
        window.scrollBy(0, divResultado.clientHeight * 5);
    }

    

    function calcularDiferenciaEnDias(fechaOrigen, fechaDestino) {
        const fecha1 = new Date(fechaOrigen);
        const fecha2 = new Date(fechaDestino);
        const diferenciaEnMilisegundos = fecha2 - fecha1;
        const unDiaEnMilisegundos = 1000 * 60 * 60 * 24; // 1 día en milisegundos
        const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / unDiaEnMilisegundos);
      
        return diferenciaEnDias;
    }

}

function baño(){
    let btnConsulta = document.querySelector("#buttonConsultar").addEventListener("click", calcular);
    let divResultado = document.querySelector("#resultadoDiv");

    function calcular(){
        let perroTamanio = document.querySelector("#perroTamanio").value;
        let perroPelaje = document.querySelector("#perroPelaje").value;
        let perroCorte = document.querySelector("#perroCorte").value;
        let valorCorte, valorBanio, razaEjemplo, ejemplo;
        if(perroPelaje == "largo"){
            perroPelaje = true;

        }
        else{
            perroPelaje = false;
        }
        
        const url = 'https://64e0b77950713530432c98b8.mockapi.io/api/peluqueria/Peluqueria';
        fetch(`${url}/?tamanio=${perroTamanio}&tienePelolargo=${perroPelaje}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`Error de red - Código de estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            valorCorte = data[0].corte;
            valorBanio = data[0].banio;
            ejemplo = data[0].ejemplo;
            razaEjemplo = `<p> Raza Ejemplo : ${ejemplo} </p>`
            const saltoLinea = "<br>";
            if(perroCorte == "si"){
                divResultado.innerHTML = "Valor estimado = " + valorCorte + saltoLinea + razaEjemplo;    
            }else{
                divResultado.innerHTML = "Valor estimado = " + valorBanio + saltoLinea + razaEjemplo;
            }
            

        })
        .catch(error => {
            // Manejar errores de red o de la aplicación
            console.error('Error al obtener los datos:', error);
        });


    //     const saltoLinea = "<br>";
    //     const gigantePeloLargoCorte = 9200;
    //     const gigantePeloLargoBanio = 8500;
    //     const gigantePeloCortoBanio = 8000;
    //     const grandePeloLargoCorte = 8200;
    //     const grandePeloLargoBanio = 7000;
    //     const grandePeloCortoBanio = 6000;
    //     const medianoPeloLargoCorte = 6000;
    //     const medianoPeloLargoBanio = 5000;
    //     const medianoPeloCortoBanio = 4500;
    //     const pequenioPeloLargoCorte = 4500;
    //     const pequenioPeloLargoBanio = 3600;
    //     const pequenioPeloCortoBanio = 3600;
        
       
    //    switch(perroTamanio.value){
    //     case 'gigante':
    //         switch(perroPelaje.value){
    //             case 'largo':
    //                 switch(perroCorte.value){
    //                     case 'si':
    //                         razaEjemplo = "<p> Raza Ejemplo : Schnauzer Gigante </p>"
    //                         divResultado.innerHTML = "Valor estimado = " + gigantePeloLargoCorte + saltoLinea + razaEjemplo;
    //                     break;
                        
    //                     case 'no':
    //                         razaEjemplo = "<p> Raza Ejemplo : Schnauzer Gigante </p>"
    //                         divResultado.innerHTML = "Valor estimado = " + gigantePeloLargoBanio + saltoLinea + razaEjemplo;
    //                     break;
    //                 }
    //                 break;
    //             case 'corto':
    //                 razaEjemplo = "<p>Raza Ejemplo : Dogo Burdeos</p>";
    //                 switch(perroCorte.value){
    //                     case 'si':
    //                         divResultado.innerHTML = "Valor estimado = " + gigantePeloCortoBanio + saltoLinea + razaEjemplo;
    //                     break;

    //                     case 'no':
    //                         divResultado.innerHTML = "Valor estimado = " + gigantePeloCortoBanio + saltoLinea + razaEjemplo;
    //                     break;
    //                 }
    //             break;      
    //         }
    //     break;
    //     case 'grande':
    //         switch(perroPelaje.value){
    //             case 'largo':
    //                 switch(perroCorte.value){
    //                     case 'si':
    //                         razaEjemplo = "<p> Raza Ejemplo : Golden Retriever </p>"
    //                         divResultado.innerHTML = "Valor estimado = " + grandePeloLargoCorte + saltoLinea + razaEjemplo;
    //                     break;
                        
    //                     case 'no':
    //                         razaEjemplo = "<p> Raza Ejemplo : Golden Retriever </p>"
    //                         divResultado.innerHTML = "Valor estimado = " + grandePeloLargoBanio + saltoLinea + razaEjemplo;
    //                     break;
    //                 }
    //                 break;
    //             case 'corto':
    //                 razaEjemplo = "<p>Raza Ejemplo : Labrador</p>";
    //                 switch(perroCorte.value){
    //                     case 'si':
    //                         divResultado.innerHTML = "Valor estimado = " + grandePeloCortoBanio + saltoLinea + razaEjemplo;
    //                     break;

    //                     case 'no':
    //                         divResultado.innerHTML = "Valor estimado = " + grandePeloCortoBanio + saltoLinea + razaEjemplo;
    //                     break;
    //                 }
    //             break;      
    //         }
    //     break;
    //     case 'mediano':
    //         switch(perroPelaje.value){
    //             case 'largo':
    //                 switch(perroCorte.value){
    //                     case 'si':
    //                         razaEjemplo = "<p>Raza Ejemplo : Border Collie</p>";
    //                         divResultado.innerHTML = "Valor estimado = " + medianoPeloLargoCorte + saltoLinea + razaEjemplo;
    //                     break;

    //                     case 'no':
    //                         razaEjemplo = "<p>Raza Ejemplo : Border Collie</p>";
    //                         divResultado.innerHTML = "Valor estimado = " + medianoPeloLargoBanio + saltoLinea + razaEjemplo;
    //                     break;
    //                 }
    //                 break;
    //             case 'corto':
    //                 razaEjemplo = "<p>Raza Ejemplo : Boxer</p>";
    //                 switch(perroCorte.value){
    //                     case 'si':
    //                         divResultado.innerHTML = "Valor estimado = " + medianoPeloCortoBanio + saltoLinea + razaEjemplo;
    //                     break;

    //                     case 'no':
    //                         divResultado.innerHTML = "Valor estimado = " + medianoPeloCortoBanio + saltoLinea + razaEjemplo;
    //                     break;
    //                 }
    //             break;      
    //         }
    //     break;
    //     case 'chico':
    //         switch(perroPelaje.value){
    //             case 'largo':
    //                 razaEjemplo = "<p>Raza Ejemplo : Caniche Toy</p>";
    //                 switch(perroCorte.value){
    //                     case 'si':
    //                         divResultado.innerHTML = "Valor estimado = " + pequenioPeloLargoCorte + saltoLinea + razaEjemplo;
    //                     break;

    //                     case 'no':
    //                         divResultado.innerHTML = "Valor estimado = " + pequenioPeloLargoBanio + saltoLinea + razaEjemplo;
    //                     break;
    //                 }
    //                 break;
    //             case 'corto':
    //                 razaEjemplo = "<p>Raza Ejemplo : Jack Russell</p>";
    //                 switch(perroCorte.value){
    //                     case 'si':
    //                         divResultado.innerHTML = "Valor estimado = " + pequenioPeloCortoBanio + saltoLinea + razaEjemplo;
    //                     break;

    //                     case 'no':
    //                         divResultado.innerHTML = "Valor estimado = " + pequenioPeloCortoBanio + saltoLinea + razaEjemplo;
    //                     break;
    //                 }
    //             break;      
    //         }
    //     break;
    //    }
       window.scrollBy(0, divResultado.clientHeight * 5);
    }
}


