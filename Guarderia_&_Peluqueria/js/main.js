"use strict";

/*

//------------- menu ----------------
document.querySelector("#btn-menu").addEventListener("click", deslizar);

function deslizar(){
    menu.classList.toggle("deslizar");
};

**/

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
        conteiner.innerHTML = 'error loading for /' + id + '...';
        }
    }catch(error){
        console.log(error);
    }
    if(id === 'carrito'){
        // captcha();
    }
    if(id === 'bebidas'){
        //agregarTabla();
    }
}

function push(event) {
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