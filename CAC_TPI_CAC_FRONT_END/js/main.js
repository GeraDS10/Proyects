"use strict";

const TICKETVALUE = 200;
const ESTUDIANTE_DESCUENTO = 0.2;
const TRAINEE_DESCUENTO = 0.5;
const JUNIOR_DESCUENTO = 0.85;

let navLaConferencia = document.getElementById("navLaConferencia");
let navSerOrador = document.getElementById("navSerOrador");
if(document.title == "Conf Bs As"){
    navLaConferencia.classList.add('selected');
}
else if(document.title == "Tickets"){
    navSerOrador.classList.add("selected")
}

if(document.getElementById("form_tickets_buy")){
    let form = document.getElementById("form_tickets_buy");
    
    form.addEventListener("submit", e => {
        e.preventDefault();
        let ticketsCantidad = document.getElementById("form_tickets_quantity_input").value;
        let ticketsCategoria = document.getElementById("form_tickets_category_select").value;
        let ticketsTotal = document.getElementById("form_tickets_total_output");
        getResumen(ticketsCantidad, ticketsCategoria, ticketsTotal);
    });
    
    form.addEventListener("reset", e => {
        e.preventDefault();
        let ticketsTotal = document.getElementById("form_tickets_total_output");
        let formName = document.getElementById("form_tickets_buy_nombre");
        let formLastname = document.getElementById("form_tickets_buy_lastname");
        let formMail = document.getElementById("form_tickets_contact_mail");
        let formCantidad = document.getElementById("form_tickets_quantity_input");
        let formCategory = document.getElementById("form_tickets_category_select");
        formName.value = "";
        formLastname.value = "";
        formMail.value = "";
        formCantidad.value = "";
        formCategory.value = "estudiante"
        ticketsTotal.innerHTML = "Total a Pagar: $";
    })
}




function getResumen(cantidad, categoria, total){
    switch(categoria){
        case "estudiante":
            total.innerHTML = "Total a Pagar: $" + cantidad * TICKETVALUE * ESTUDIANTE_DESCUENTO;
            console.log("Estudiante -> " +cantidad);
            break;
        case "trainee":
            total.innerHTML = "Total a Pagar: $" + cantidad * TICKETVALUE * TRAINEE_DESCUENTO;
            console.log("Trainee -> " +cantidad);
            break;
        case "junior":
            total.innerHTML = "Total a Pagar: $" + cantidad * TICKETVALUE * JUNIOR_DESCUENTO;
            console.log("Junior -> " +cantidad);
            break;
    }
}

