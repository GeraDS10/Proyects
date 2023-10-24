//Selección de elementos de formulario al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    const anioInput = document.getElementById("anio");
    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const botonCalcular = document.getElementById("boton_calcular");
    const resultado = document.getElementById("resultado");

    // clase CuotaSeguro con constructor
    class CuotaSeguro {
        constructor(anio, marca, modelo, tipoSeguro, dolarBlue) {
            this.anio = anio;
            this.marca = marca;
            this.modelo = modelo;
            this.tipoSeguro = tipoSeguro;
            this.dolarBlue = dolarBlue;
        }
        // Se añade el método calcular, para calcular la cotización
        calcular() {
            //Calculo de valor de cuota considerando el anio, la cantidad de letras de marca y modelo, el tipo de seguro y la cotizacion blue en tiempo real
            return (this.anio * 2) + (this.marca.length * 2) + (this.modelo.length * 10 / 100) * (this.tipoSeguro === "completo" ? 2 : 1) * this.dolarBlue;
        }
    }


    /* 
        Se le agrega funcionalidad al evento click sobre el boton calcular cotizacion, tomando en ese momento los valores de anio, 
        modelo y tipo de seguro
      */
    botonCalcular.addEventListener("click", () => {
        resultado.classList.remove("mostrar_resultado");
        resultado.innerHTML = "";
        const anio = document.getElementById("anio").value;
        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;
        const tipoSeguro = document.getElementById("tipo_seguro").value;
        resultado.classList.remove("texto_error");
        anioInput.classList.remove("marca_error");
        marcaSelect.classList.remove("marca_error");
        modeloSelect.classList.remove("marca_error");

        // Verifica que se hayan seleccionado valores en año, marca y modelo, agregando estilo si alguna casilla no tiene valor seleccionado
        if(anio == ""){
            resultado.innerHTML = "Debe seleccionar año"
            anioInput.classList.add("marca_error");
            resultado.classList.add("texto_error");
            resultado.classList.add("mostrar_resultado");
        } else if(marca == ""){
            resultado.innerHTML = "Debe seleccionar marca"
            marcaSelect.classList.add("marca_error");
            resultado.classList.add("texto_error");
            resultado.classList.add("mostrar_resultado");
        }else if(modelo == ""){
            resultado.innerHTML = "Debe seleccionar modelo"
            modeloSelect.classList.add("marca_error");
            resultado.classList.add("texto_error");
            resultado.classList.add("mostrar_resultado");
        }else{
             // Realiza la solicitud a la API de tasas de cambio dolarapi
            fetch("https://dolarapi.com/v1/dolares/blue")
            .then(response => response.json())
            .then(data => {

                //Toma el valor dolar blue venta dentro de los valores recibidos
                const dolarBlue = data.venta;

                // Crea una instancia del Cotizador de Seguros pasando como parametro anio, modelo, tipo de seguro y valor dolar blue
                const cotizadorSeguro = new CuotaSeguro(anio, marca, modelo, tipoSeguro, dolarBlue);
                
                // Calcula la cotización mediante metodo calcular en la instancia cotizadorSeguro
                const montoCuota = cotizadorSeguro.calcular();
                resultado.innerText = `Cotización: $${montoCuota}`;
            })
            .catch(error => {
                //Atrapa el error en caso de un fallo en la promesa, exponiendolo por consola y mostrando un mensaje al usuario
                console.error("Error al obtener tasas de cambio: ", error);
                resultado.innerText = "Error al obtener tasas de cambio.";
            });
            resultado.classList.add("mostrar_resultado");
        }

       
        
    });

    // Agrega funcionalidad al evento change en el select de marca
    marcaSelect.addEventListener("change", () => {
        // Obtiene valor en select de marca
        const marcaElegida = marcaSelect.value;
        // Obtiene los modelos posibles del map modelosPorMarca en funcion del valor de marca obtenido
        const modelosPosibles = modelosPorMarca.get(marcaElegida) || [];
        // Limpia las opciones disponibles en modelo
        modeloSelect.innerHTML = '<option value="">Selecciona una marca primero</option>';
        // Agrega los modelos disponibles en opciones dentro del select
        modelosPosibles.forEach(modelo => {
            const option = document.createElement("option");
            option.value = modelo;
            option.textContent = modelo;
            modeloSelect.appendChild(option);
        });
    });
});

// Mapa donde la marca es la clave y los valores son un arreglo con los distintos modelos posibles
const modelosPorMarca = new Map([
    ["Ford", ["Fiesta", "Focus", "Mustang", "Explorer", "F-150"]],
    ["Chevrolet", ["Cruze", "Malibu", "Camaro", "Equinox", "Silverado"]],
    ["Toyota", ["Corolla", "Camry", "RAV4", "4Runner", "Tundra"]],
    ["Honda", ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"]],
    ["Volkswagen", ["Jetta", "Passat", "Tiguan", "Atlas", "Golf"]]
]);