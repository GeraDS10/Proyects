class Tablero{
    constructor(posX, posY, width, height, fill, context, fichasLinea){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = context;
        this.width = width;
        this.height = height;
        this.fichasLinea = parseInt(fichasLinea);
        let diametroFicha = height / (fichasLinea * 2 + 1);
        this.espacioEntreFichas = diametroFicha / (fichasLinea * 2 + 1);
        this.radioFicha = diametroFicha / 2;
        this.fichas = [];
        this.fichasGanadoras = [];
        this.filas = fichasLinea * 2;
        this.columnas = fichasLinea * 2;
        this.ganador = null;
        this.crearFichasTablero(this.radioFicha, this.posX, this.posY, this.espacioEntreFichas, this.ctx);
        this.draw();
        this.dibujarFichasTablero();
    }

    //Retorna jugador ganador o null si no lo hay
    getGanador(){
        return this.ganador;
    }

    //Recorre los circulos del tablero de manera vertical buscando una ficha fijada y al encontrarla verifica si existen
    //más del mismo jugador en linea hasta llegar a las necesarias para ganar
    lineaVertical(jugador1, jugador2){
        let fichasJugador1 = 0; 
        let fichasJugador2 = 0;
        let posInicio = 0;
        for(let i = 0; i < this.columnas; i++){
            for(let j = posInicio; j < (posInicio + this.filas); j++){
                if(this.fichas[j].isFixed()){
                    if(this.fichas[j].getNombreJugador() == jugador1.getNombre()){
                        if(fichasJugador1 == 0){
                          this.fichasGanadoras = [];
                        }
                        fichasJugador1++;
                        fichasJugador2 = 0;
                        this.fichasGanadoras.push(this.fichas[j]);
                        if(fichasJugador1 == this.fichasLinea){
                            this.ganador = jugador1;
                        }
                    } else{
                        if(fichasJugador2 == 0){
                            this.fichasGanadoras = [];
                        }
                        fichasJugador2++;
                        fichasJugador1 = 0;
                        this.fichasGanadoras.push(this.fichas[j]);
                        if(fichasJugador2 == this.fichasLinea){
                            this.ganador = jugador2;
                        }
                    }
                }
                else{
                    fichasJugador1 = 0;
                    fichasJugador2 = 0;
                }
            }
            posInicio += this.filas;
            
            fichasJugador1 = 0;
            fichasJugador2 = 0;
        }

    }

    //Recorre los circulos del tablero de manera horizontal buscando una ficha fijada y al encontrarla verifica si existen
    //más del mismo jugador avanzando en diagonal hacia derecha y abajo hasta llegar a las necesarias para ganar
    lineaOblicuoDescendenteDerecha(jugador1, jugador2){
        let posInicio = 0;
        for(let i = 0; i <= this.fichasLinea; i++){
            for(let j = posInicio; j <= (posInicio + this.fichasLinea); j ++){
                let fichaSeleccionada = this.fichas[j];
                if(fichaSeleccionada.isFixed()){
                    let h = j;
                    let contador = 0;
                    this.fichasGanadoras = [];
                    while((contador < this.fichasLinea) && (this.fichas[h].getNombreJugador() == fichaSeleccionada.getNombreJugador())){
                        this.fichasGanadoras.push(this.fichas[h]);
                        contador++;
                        h += (this.fichasLinea * 2 + 1);
                    }
                    if(contador == parseInt(this.fichasLinea)){
                        if(jugador1.getNombre() === fichaSeleccionada.getNombreJugador()){
                            this.ganador = jugador1;
                        }
                        else{
                            this.ganador = jugador2;
                        }
                    }
                }
            }
            posInicio += this.filas;
        }
    }

    //Recorre los circulos del tablero de manera horizontal buscando una ficha fijada y al encontrarla verifica si existen
    //más del mismo jugador avanzando en diagonal hacia derecha e izquierda hasta llegar a las necesarias para ganar
    lineaOblicuoDescendenteIzquierda(jugador1, jugador2){
        let posInicio = (this.filas - 1) * this.columnas;
        for(let i = this.columnas; i >= this.fichasLinea; i--){
            for(let j = posInicio; j <= (posInicio + this.fichasLinea); j ++){
                let fichaSeleccionada = this.fichas[j];
                if(fichaSeleccionada.isFixed()){
                    let h = j;
                    let contador = 0;
                    this.fichasGanadoras = [];
                    while((contador < this.fichasLinea) && (this.fichas[h].getNombreJugador() == fichaSeleccionada.getNombreJugador())){
                        contador++;
                        this.fichasGanadoras.push(this.fichas[h])
                        h += -(this.fichasLinea * 2 -1);
                    }
                    if(contador == parseInt(this.fichasLinea)){
                        if(jugador1.getNombre() === fichaSeleccionada.getNombreJugador()){
                            this.ganador = jugador1;
                        }
                        else{
                            this.ganador = jugador2;
                        }
                        // alert("Linea Oblicua Descendete izquierda! Ganador: " + fichaSeleccionada.getNombreJugador());
                        // cerrarJuego(fichaSeleccionada.getNombreJugador(), this.fichasGanadoras);
                    }
                }
            }
            posInicio -= this.filas;
        }
    }

    //Recorre los circulos del tablero de manera horizontal buscando una ficha fijada y al encontrarla verifica si existen
    //más del mismo jugador avanzando en diagonal hacia izquierda y arriba hasta llegar a las necesarias para ganar
    lineaOblicuoAscendenteIzquierda(jugador1, jugador2){
        let posInicio = (this.filas * this.columnas) - 1;
        for(let i = this.columnas; i >= this.fichasLinea; i--){
            for(let j = posInicio; j >= (posInicio - this.fichasLinea); j --){
                let fichaSeleccionada = this.fichas[j];
                if(fichaSeleccionada.isFixed()){
                    let h = j;
                    let contador = 0;
                    this.fichasGanadoras = [];
                    while((contador < this.fichasLinea) && (this.fichas[h].getNombreJugador() == fichaSeleccionada.getNombreJugador())){                        
                        contador++;
                        this.fichasGanadoras.push(this.fichas[h]);
                        h += -(this.fichasLinea * 2 + 1);
                    }
                    if(contador == parseInt(this.fichasLinea)){
                        if(jugador1.getNombre() === fichaSeleccionada.getNombreJugador()){
                            this.ganador = jugador1;
                        }
                        else{
                            this.ganador = jugador2;
                        }
                    }
                }
            }
            posInicio -= this.filas;
        }
    }

    //Recorre los circulos del tablero de manera horizontal buscando una ficha fijada y al encontrarla verifica si existen
    //más del mismo jugador avanzando en diagonal hacia derecha y arriba hasta llegar a las necesarias para ganar
    lineaOblicuoAscendenteDerecha(jugador1, jugador2){
        let posInicio = (this.filas - 1);
        for(let i = this.columnas; i >= this.fichasLinea; i--){
            for(let j = posInicio; j >= (posInicio - this.fichasLinea); j--){
                let fichaSeleccionada = this.fichas[j];
                if(fichaSeleccionada.isFixed()){
                    let h = j;
                    let contador = 0;
                    this.fichasGanadoras = [];
                    while((contador < this.fichasLinea) && (this.fichas[h].getNombreJugador() == fichaSeleccionada.getNombreJugador())){
                        contador++;
                        this.fichasGanadoras.push(this.fichas[h]);
                        h += this.fichasLinea * 2 - 1;
                    }
                    if(contador == parseInt(this.fichasLinea)){
                        if(jugador1.getNombre() === fichaSeleccionada.getNombreJugador()){
                            this.ganador = jugador1;
                        }
                        else{
                            this.ganador = jugador2;
                        }
                    }
                }
            }
            posInicio += this.filas;
        }
    }

    //Recorre los circulos del tablero de manera horizontal buscando una ficha fijada y al encontrarla verifica si existen
    //más del mismo jugador en linea hasta llegar a las necesarias para ganar
    lineaHorizontal(jugador1, jugador2){
        let fichasJugador1 = 0; 
        let fichasJugador2 = 0;
        for(let i = 0; i < this.columnas; i++){
            for(let j = i; j < this.fichas.length; j += this.filas){
                // this.fichas[j].setResaltado(true);
                this.fichas[j].draw();
                if(this.fichas[j].isFixed()){
                    if(this.fichas[j].getNombreJugador() == jugador1.getNombre()){
                        if(fichasJugador1 == 0){
                            this.fichasGanadoras = [];
                        }
                        fichasJugador1++;
                        fichasJugador2 = 0;
                        this.fichasGanadoras.push(this.fichas[j]);
                        if(fichasJugador1 == this.fichasLinea){
                           this.ganador = jugador1;
                        }
                    } else{
                        if(fichasJugador2 == 0){
                            this.fichasGanadoras = [];
                        }
                        fichasJugador2++;
                        fichasJugador1 = 0;
                        this.fichasGanadoras.push(this.fichas[j]);
                        if(fichasJugador2 == this.fichasLinea){
                            this.ganador = jugador2;
                        }
                    }
                }
                else{
                    fichasJugador1 = 0;
                    fichasJugador2 = 0;
                }
                this.fichas[j].setResaltado(false);
                this.fichas[j].draw();
            }
            fichasJugador1 = 0;
            fichasJugador2 = 0;
        }

    }

    //Crea las fichas del tablero por columna de manera vertical descendente a partir de las coordendas del tablero, el radio de la ficha y
    //el espacio entre ellas, agregandolas al arreglo fichas
    crearFichasTablero(radioFicha, tableroPosX, tableroPosY, espacioEntreFichas, ctx){
        let posX = tableroPosX + espacioEntreFichas + radioFicha;
        let posY = tableroPosY + espacioEntreFichas + radioFicha;
        for(let i = 0; i < this.columnas; i++){
            for(let j = 0; j < this.filas; j++){
                this.fichas.push(new Circle(posX, posY, radioFicha, "white", ctx, null));
                posY += (radioFicha * 2) + espacioEntreFichas;
            }
            posX += (radioFicha * 2) + espacioEntreFichas;
            posY = tableroPosY + espacioEntreFichas + radioFicha;
        }
    }

    //Dibuja las fichas del tablero creadas y agregadas al arreglo 
    dibujarFichasTablero(){
        this.fichas.forEach(element => {
            element.draw();
        });
    }

    //Verifica si hay una ficha de tablero disponible en las coordenadas recibidas
    estaDisponible(x,y){
        let encontrada = false;
        let i = 0;
        while((i < this.fichas.length) && (encontrada != true)){
            if((this.fichas[i].isPointInside(x,y)) && (!this.fichas[i].isFixed())){
                encontrada = true;
                return true;
            }
            i++;
        }
        return false;
    }

    //Fija la ficha recibida en las coordenadas recibidas 
    fijarFicha(ficha, posX, posY){
        let encontrada = false;
        let i = 0;
        while((i < this.fichas.length) && (encontrada != true)){
            if(this.fichas[i].isPointInside(posX,posY)){
                encontrada = true;
            }
            i++;
        }
        let posFicha = this.fichas[i-1].getPos();
        ficha.setPosition(posFicha[0], posFicha[1]);
        ficha.fix();
        this.fichas.splice(i-1, 1, ficha);
    }

    //Dibuja el tablero
    draw(){
        this.ctx.fillStyle = this.fill;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    //Devuelve el ancho del tablero
    getWidth(){
        return this.width;
    }
    
    //Devuelve el alto del tablero
    getHeight(){
        return this.height;
    }

}