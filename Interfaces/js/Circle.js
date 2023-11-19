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

    //Dibuja la ficha
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

    //Determina el relleno de la ficha
    setFill(fill){
        this.fill = fill;
    }

    //Determina las coordenadas de la ficha
    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    //Retorna el nombre del jugador
    getNombreJugador(){
        return this.nombreJugador;
    }

    //Determina el relleno de la ficha
    setFill(fill){
        this.fill = fill;
    }

    //Retorna la coordenada en X
    getPosX(){
        return this.posX;
    }

    //Retorna la coordenada en Y
    getPosY(){
        return this.posY;
    }

    //Retorna el relleno de la ficha
    getFill(){
        return this.fill;
    }

    //Determina las coordenadas de la ficha
    setPos(x,y){
        this.posX = x;
        this.posY = y;
    }

    //Retorna las coordenadas de la ficha
    getPos(){
        return [this.posX, this.posY];
    }

    //Retorna si la ficha esta fijada
    isFixed(){
        return this.fixed;
    }

    //Fija la ficha
    fix(){
        this.fixed = true;
    }

    //Retorna el radio de la ficha
    getRadius(){
        return this.radius;
    }

    //Resalta la ficha
    setResaltado(resaltado){
        this.resaltado = resaltado;
    }

    //Retorna si las coordenadas recibidas se encuentran dentro del radio de la ficha
    isPointInside(x, y){
        let _x = this.posX  - x;
        let _y = this.posY  - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    isPointOnCircle(x){
        return Math.abs(this.posX - x) < this.radius;
    }
}