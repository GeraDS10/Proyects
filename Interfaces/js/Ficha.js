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

    getNombreJugador(){
        return this.nombreJugador;
    }

    

    draw(){
     // Dibuja la imagen como fondo
        this.ctx.save(); // Guardar el estado actual del contexto
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.clip(); // Recortar el área del círculo

        this.ctx.drawImage(this.image, this.posX - this.radio, this.posY - this.radio, this.radio * 2, this.radio * 2);
        
        this.ctx.restore(); // Restaurar el estado del contexto

        if(this.resaltado == true){
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }

    }

    
    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    getPosition(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        }
    }


    setPos(x,y){
        this.posX = x;
        this.posY = y;
    }

    getPos(){
        return [this.posX, this.posY];
    }

    
    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    isFixed(){
        return this.fixed;
    }

    fix(){
        this.fixed = true;
    }

    getRadio(){
        return this.radio;
    }

    setResaltado(resaltado){
        this.resaltado = resaltado;
    }

    isPointInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }
}