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

    getGanador(){
        return this.ganador;
    }

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
                        // alert("Linea Oblicua Descendete Derecha! Ganador: " + fichaSeleccionada.getNombreJugador());
                        // cerrarJuego(fichaSeleccionada.getNombreJugador(), this.fichasGanadoras);
                    }
                }
            }
            posInicio += this.filas;
        }
    }

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
                        // this.fichas[h].setResaltado(true);
                        // this.fichas[h].draw();
                        
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
                        // alert("Linea Oblicua Ascendente Izquierda! Ganador: " + fichaSeleccionada.getNombreJugador());
                        // cerrarJuego(fichaSeleccionada.getNombreJugador(), this.fichasGanadoras);
                    }
                }
            }
            posInicio -= this.filas;
        }
    }

    lineaOblicuoAscendenteDerecha(jugador1, jugador2){
        let posInicio = (this.filas - 1);
        for(let i = this.columnas; i >= this.fichasLinea; i--){
            for(let j = posInicio; j >= (posInicio - this.fichasLinea); j--){
                let fichaSeleccionada = this.fichas[j];
                // this.fichas[j].setResaltado(true);
                // this.fichas[j].draw();
                if(fichaSeleccionada.isFixed()){
                    // this.fichas[j].setResaltado(true);
                    // this.fichas[j].draw();
                    let h = j;
                    let contador = 0;
                    this.fichasGanadoras = [];
                    while((contador < this.fichasLinea) && (this.fichas[h].getNombreJugador() == fichaSeleccionada.getNombreJugador())){
                        // this.fichas[h].setResaltado(true);
                        // this.fichas[h].draw();
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
                        // alert("Linea Oblicua Ascendente Derecha! Ganador: " + fichaSeleccionada.getNombreJugador());
                        // cerrarJuego(fichaSeleccionada.getNombreJugador());
                    }
                }
            }
            posInicio += this.filas;
        }
    }

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
                            // alert("Ganador: " + jugador2.getNombre());
                            // cerrarJuego(jugador2.getNombre(), this.fichasGanadoras);
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

    dibujarFichasTablero(){
        this.fichas.forEach(element => {
            element.draw();
        });
    }

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

    fijarFicha(ficha, posX, posY){
        let encontrada = false;
        let fichaTablero;
        let i = 0;
        while((i < this.fichas.length) && (encontrada != true)){
            if(this.fichas[i].isPointInside(posX,posY)){
                encontrada = true;
            }
            i++;
        }
        let posFicha = this.fichas[i-1].getPos();
        ficha.setPos(posFicha[0], posFicha[1]);
        ficha.fix();
        this.fichas.splice(i-1, 1, ficha);
    }

    draw(){
        this.ctx.fillStyle = this.fill;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    getWidth(){
        return this.width;
    }
    
    getHeight(){
        return this.height;
    }

}