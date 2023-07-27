"use strict";

//------------- menu ----------------
document.querySelector("#btn-menu").addEventListener("click", deslizar);

function deslizar(){
    menu.classList.toggle("deslizar");
};

//------------------PARTIAL RENDER---------------------------------------------
async function load_content(id) {
    console.log("Loading content for {" + id + "}");
    // Update text "Content loading for {id}..."
    // Here you would do content loading magic...
    // Perhaps run Fetch API to update resources
    let conteiner = document.querySelector("#content");
    try{
        let response = await fetch(`./${id}.html`);
        if (response.ok){
            let text = await response.text();
            conteiner.innerHTML = text;
        }else{
        conteiner.innerHTML = 'error loading for /' + id + '...';
        }
    }catch(error){
        console.log(error);
    }
    if(id === 'carrito'){
        captcha();
    }
    if(id === 'bebidas'){
        agregarTabla();
    }
}

function push(event) {
    // Get id attribute of the button or link clicked
    let id = event.target.id;
    // Visually select the clicked button/tab/box
    // select_tab(id);
    // Update Title in Window's Tab
    document.title = id;
    // Load content for this tab/page
    load_content(id);
    // Finally push state change to the address bar
    window.history.pushState(id, `${id}`,`./${id}.html`);
}

window.onload = event => {
    // Add history push() event when boxes are clicked
    window["inicio"].addEventListener("click", event => push(event));
    window["bebidas"].addEventListener("click", event => push(event));
    window["carrito"].addEventListener("click", event => push(event));
}

// Listen for PopStateEvent (Back or Forward buttons are clicked)
window.addEventListener("popstate", event => {
    // Grab the history state id
    let stateId = event.state;
    // Show clicked id in console (just for fun)
    console.log("stateId = ", stateId);
    // Visually select the clicked button/tab/box
    // select_tab(stateId);
    // Load content for this tab/page
    load_content(stateId);
});

//------------ Captcha ---------------
function captcha(){
    document.getElementById("btn-enviar").addEventListener("click", Verification);
    document.getElementById("btn-generar-suma").addEventListener("click", Valores);
    let sumaVerification = document.getElementById("suma-verificacion");
    let v1 
    let v2 
    
    function Valores(){
        v1 = Math.floor( Math.random()*10);
        v2 = Math.floor( Math.random()*10);
        sumaVerification.innerHTML = v1 + " + " + v2;
    }
    
    function Verification(){
        let okVerification = document.getElementById("okverification");
        let noOkVerification = document.getElementById("nookverification");
        let inputresult = document.getElementById("result");
        
        if(inputresult.value == v1 + v2){
            okVerification.innerHTML = "Aceptado";
            noOkVerification.innerHTML = "";
        }
        else{
            noOkVerification.innerHTML = "Rechazado";
            okVerification.innerHTML = "";
        }
        sumaVerification.innerHTML = "";
        inputresult.value = "";
    }
}

//------------- TABLA ----------------
function agregarTabla(){
    //---- Botones
    document.querySelector("#btn-agregarpedido").addEventListener("click", agregarDatos);
    document.querySelector("#btn_x3").addEventListener("click", Generar3);

    //---- Inputs
    let variedad = document.querySelector("#variedad");
    let marca = document.querySelector("#marca");
    let contenido = document.querySelector("#contenido");
    let precio = document.querySelector("#precio");
    let cantidad = document.querySelector("#cantidad");

    //Tabla Dinamica
    let listas = document.querySelector('#pedido-ingresado');

    //URL de MOCKAPI
    const url = 'https://60c9fa1e772a760017204eac.mockapi.io/Vinos';
    //id objetos en api
    let id = 0;
    //Objeto
    let vino = {};

    //-------------------OBTENER JSON DE API (GET)--------------------------------
    async function obtenerDatos (){
        listas.innerHTML = "";
        try {
            let res = await fetch(url);
            let fila = await res.json();
            console.table(fila);
            for (const vino of fila) {
                id = vino.id;
                listas.innerHTML += "<tr>" +
                    "<th>" + vino.variedad + "</th>" +
                    "<th>" + vino.marca + "</th>" + 
                    "<th>" + vino.contenido + "ML</th>" +
                    "<th>$" + vino.precio + "</th>" + 
                    "<th>" + vino.cantidad + "</th>" +
                    "<th>" + '<button type= "button" id="'+id+'" value= "'+id+'" class= "btn-borrar"> BORRAR </button>' + "</th>" +
                    "<th>" + '<button type= "button" value= "'+id+'" class= "btn-editar"> EDITAR </button>' + "</th>" +
                    "</tr>";
            }
        }catch (error){
            console.log(error);
        }
        agregarBorrar();
        agregarEditar();
    }

    //-------------------AGREGAR DATOS SERVER (POST)------------------------------
    async function agregarDatos(){
        vino = {
            "variedad": variedad.value,
            "marca" : marca.value,
            "cantidad": cantidad.value,
            "precio": precio.value,
            "contenido": contenido.value
        }
        console.table(vino);
        try {
            let res = await fetch (url, {
                "method": "POST",
                "headers": {'Content-type': "application/json"},
                "body": JSON.stringify(vino)
            });
            if (res.status === 201){
                console.log("ENVIADO");
            }
        }catch(error){
            console.log(error);
        }
        obtenerDatos();
    }

    //Añadir accion botones borrar
    function agregarBorrar(){
        let borrar_filas = document.querySelectorAll('.btn-borrar');
        borrar_filas.forEach(element => {element.addEventListener("click", borrarFila)});
    }

    //Funcion Borrar Fila
    async function borrarFila(){
        console.log("BORRANDO FILA " + this.value);
        try{
            let res = await fetch(`${url}/${this.value}` , {
            "method": "DELETE"
        });
            if (res.status === 200){
                console.log("ELIMINADO");
                obtenerDatos();
            }
                else{
                    alert("El producto a borrar no existe");
                }
        }catch(error){
            console.log(error);
        }
    }

    //Añadir accion botones editar
    function agregarEditar(){
        let editar_filas = document.querySelectorAll('.btn-editar'); 
        editar_filas.forEach(element => {element.addEventListener("click", editarFila)});
    }
    //Funcion Editar Fila
    async function editarFila() {
        vino = {
            "variedad": variedad.value,
            "marca" : marca.value,
            "cantidad": cantidad.value,
            "precio": precio.value,
            "contenido": contenido.value
        }
        console.log("BORRANDO FILA " + this.value);
        try {
            let res = await fetch (`${url}/${this.value}`, {
                "method": "PUT",
                "headers": {'Content-type': "application/json"},
                "body": JSON.stringify(vino)
            });
            if (res.status === 200){
                console.log("MODIFICADO");
                obtenerDatos();
            }
        }catch(error){
            console.log(error);
        }
        ResetInputs();
    }

    //----------------AGREGAR X 3---------------------
    async function Generar3 (){
        for (let i = 0; i < 3; i++) {
            await agregarDatos();
        }
    }

    //---- Resetear inputs
    function ResetInputs() {
        marca.value = "";
        contenido.value = "";
        precio.value = "";
        cantidad.value = "";
    }
    obtenerDatos();

    //----------------Filtro columna variedad (select)---------------------
    let filtroVariedad = document.querySelector("#filtro-variedad");

    //Select en Variedad
    filtroVariedad.innerHTML = 'VARIEDAD' +
    '<select id="filtrado">' + 
    '<option>Todos</option>' +
    '<option>Malbec</option>' + 
    '<option>Rosado</option>' + 
    '<option>Orgánico</option>' +
    '<option>Blanco Dulce</option>' + '</select>';

    document.querySelector("#filtrado").addEventListener( "click" ,Filtrar);
    //funcion filtrar
    async function Filtrar(){
        console.log("FILTRO");
        filtroVariedad = document.querySelector("#filtrado");
        console.log(filtroVariedad.value);
        try {
            let res = await fetch(url);
            let fila = await res.json();
            if(filtroVariedad.value == "Todos"){
                obtenerDatos();
            }
            else{
                listas.innerHTML = "";
                for (const vino of fila) {
                    id = vino.id;
                    if(vino.variedad === filtroVariedad.value){
                        listas.innerHTML += "<tr>" + "<th>" + vino.variedad + "</th>" +
                        "<th>" + vino.marca + "</th>" + 
                        "<th>" + vino.contenido + "</th>" +
                        "<th>" + vino.precio + "</th>" + 
                        "<th>" + vino.cantidad + "</th>" +
                        "<th>" + '<button type= "button" id="'+id+'" value= "'+id+'" class= "btn-borrar"> BORRAR </button>' + "</th>" +
                        "<th>" + '<button type= "button" value= "'+id+'" class= "btn-editar"> EDITAR </button>' + "</th>" + 
                        "</tr>";
                    }  
                }
            }
        }catch (error){
            console.log(error);
        }
        agregarBorrar();
        agregarEditar();
    }
}