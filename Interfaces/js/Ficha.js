class Ficha{
    constructor(posX, posY, radio, imagenSrc, context, nombreJugador){
        this.posX = posX;
        this.posY = posY;
        this.image = new Image();
        this.image.src = imagenSrc;
        this.resaltado = false;
        this.resaltadoEstilo = 'red';
        this.ctx = context;
        this.radio = radio;
        this.fixed = false;
        this.nombreJugador =nombreJugador;
        this.image.onload = () =>{
            this.draw();
        }
    }

    //Retorna en el nombre del jugador dueño de la ficha
    getNombreJugador(){
        return this.nombreJugador;
    }

    //Dibuja la ficha
    draw(){
     // Dibuja la imagen como fondo
        this.ctx.save(); // Guardar el estado actual del contexto
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.clip(); // Recortar el área del círculo
        this.ctx.drawImage(this.image, this.posX - this.radio, this.posY - this.radio, this.radio * 2, this.radio * 2); //Dibuja la imagen
        this.ctx.restore(); // Restaurar el estado del contexto
        if(this.resaltado == true){
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }

    }

    //Determina las coordenadas de la ficha
    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    //Retorna las coordendas de la ficha en un objeto
    getPosition(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    //Retorna las coordendas de la ficha en un arreglo
    getPos(){
        return [this.posX, this.posY];
    }

    //Retorna coordenada en X
    getPosX(){
        return this.posX;
    }

    //Retorna coordenada en Y
    getPosY(){
        return this.posY;
    }

    //Retorna si se encuentra fijada la ficha
    isFixed(){
        return this.fixed;
    }

    //Fija la ficha
    fix(){
        this.fixed = true;
    }

    //Retorna el radio
    getRadio(){
        return this.radio;
    }

    //Resalta la ficha
    setResaltado(resaltado){
        this.resaltado = resaltado;
    }

    //Retorna verdadero en caso de que las coordenadas recibidas se encuentren dentro de la ficha
    isPointInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }

    isPointOnCircle(x){
        return Math.abs(this.posX - x) < this.radio;
    }
}