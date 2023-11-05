class Circle{
    constructor(posX, posY, radius, fill, context, nombreJugador){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoEstilo = 'red';
        this.ctx = context;
        this.radius = radius;
        this.fixed = false;
        this.nombreJugador =nombreJugador;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2* Math.PI);
        this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.closePath();
        
        
        if(this.resaltado == true){
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }
    }

    setFill(fill){
        this.fill = fill;
    }


    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    getNombreJugador(){
        return this.nombreJugador;
    }

    setFill(fill){
        this.fill = fill;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    
    getFill(){
        return this.fill;
    }

    setPos(x,y){
        this.posX = x;
        this.posY = y;
    }

    getPos(){
        return [this.posX, this.posY];
    }

    isFixed(){
        return this.fixed;
    }

    fix(){
        this.fixed = true;
    }

    getRadius(){
        return this.radius;
    }

    setResaltado(resaltado){
        this.resaltado = resaltado;
    }

    isPointInside(x, y){
        let _x = this.posX  - x;
        let _y = this.posY  - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}