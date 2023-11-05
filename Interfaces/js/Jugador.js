class Jugador{
    constructor(nombre, radioFicha, fichasPosX, fichasPosY, imagenFicha, ctx){
        this.nombre = nombre;
        this.radioFicha = radioFicha;
        this.fichasPosX = fichasPosX;
        this.fichasPosY = fichasPosY;
        this.ctx = ctx;
        this.fichas = [];
        this.imagenFicha = imagenFicha;
    }

    getNombre(){
        return this.nombre;
    }


    agregarFicha(){
        let ficha = new Ficha(this.fichasPosX, this.fichasPosY, this.radioFicha, this.imagenFicha, this.ctx, this.nombre);
        ficha.draw();
        this.fichas.push(ficha);
    }

    dibujarFichas(){
        this.fichas.forEach(ficha => {
            ficha.draw();
        });
    }

    obtenerFichas(){
        return this.fichas;
    }
}