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
    window.history.pushState(id, `${id}`,`./${id}.html`);
});


//------------------PARTIAL RENDER---------------------------------------------
async function load_content(id) {
    console.log("Loading content for {" + id + "}");
    let conteiner = document.querySelector("#content");
    try{
        let response = await fetch(`./${id}.html`);
        if (response.ok){
            let text = await response.text();
            conteiner.innerHTML = text;
        }else{
        //conteiner.innerHTML = 'error loading for /' + id + '...';
        conteiner.innerHTML = '<div class="logoCompletoDiv">' + 
                                '<img src="../Guarderia_&_Peluqueria/images/LogoCompleto.png" alt="Logo" id="logoCompleto">' +
                                '</div>';
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
    deslizar();
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
    const valorEstadia = 1800;
    let btnConsulta = document.querySelector("#buttonConsultar").addEventListener("click", calcular);
    let divResultado = document.querySelector("#resultadoDiv");

    function calcularAdicional(horaEgreso){
        if(( horaEgreso > '13:00') && ( horaEgreso < '19:00' )){
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
        if(horaEgreso >= '00:00'){
            adicionalDia = calcularAdicional(horaEgreso);
            if(diasEstadia > 0){
                divResultado.innerHTML = "Valor Estadia = $" + (diasEstadia * valorEstadia + adicionalDia);
            }
            else if(diasEstadia == 0){
                divResultado.innerHTML = "Valor Estadia = $" + (valorEstadia + adicionalDia);
            }
            else{
                divResultado.innerHTML = "Fechas inválidas, intente nuevamente";    
            }
        }
        else{
            divResultado.innerHTML = "Horario de egreso inválido, intente nuevamente";    
        }
        
        divResultado.classList.remove("ocultar");
    }

    

    function calcularDiferenciaEnDias(fechaOrigen, fechaDestino) {
        const fecha1 = new Date(fechaOrigen);
        const fecha2 = new Date(fechaDestino);
        console.log(fechaOrigen + " " + fechaDestino);
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
        let perroTamanio = document.querySelector("#perroTamanio");
        let perroPelaje = document.querySelector("#perroPelaje");
        let perroCorte = document.querySelector("#perroCorte");
       
       switch(perroTamanio.value){
        case 'grande':
            switch(perroPelaje.value){
                case 'largo':
                    switch(perroCorte.value){
                        case 'si':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;
                        
                        case 'no':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;
                    }
                    break;
                case 'mediano':
                    switch(perroCorte){
                        case 'si':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;

                        case 'no':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;
                    }
                    break;
                case 'corto':
                    switch(perroCorte){
                        case 'si':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;

                        case 'no':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;
                    }
                break;      
            }

        break;

        case 'mediano':
            switch(perroPelaje){
                case 'largo':
                    switch(perroCorte){
                        case 'si':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;

                        case 'no':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;
                    }
                    break;
                case 'mediano':
                    switch(perroCorte){
                        case 'si':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;

                        case 'no':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;
                    }
                    break;
                case 'corto':
                    switch(perroCorte){
                        case 'si':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;

                        case 'no':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;
                    }
                break;      
            }

        break;

        case 'chico':
            switch(perroPelaje){
                case 'largo':
                    switch(perroCorte){
                        case 'si':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;

                        case 'no':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;
                    }
                    break;
                case 'mediano':
                    switch(perroCorte){
                        case 'si':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;

                        case 'no':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;
                    }
                    break;
                case 'corto':
                    switch(perroCorte){
                        case 'si':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;

                        case 'no':
                            divResultado.innerHTML = "Valor estimado = xxxx"
                        break;
                    }
                break;      
            }

        break;
       }
    }
}


