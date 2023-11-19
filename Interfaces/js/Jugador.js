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

    //Retorna el nombre del jugador
    getNombre(){
        return this.nombre;
    }

    //Agrega una ficha al arreglo de fichas del jugador
    agregarFicha(cantidad){
        let i = 0;
        while(i < cantidad){
            while(i < cantidad){
                let ficha = new Ficha(this.fichasPosX, this.fichasPosY, this.radioFicha, this.imagenFicha, this.ctx, this.nombre);
                ficha.draw();
                this.fichas.push(ficha);
                this.fichasPosY += this.radioFicha * 0.1;
                i++;
            }            
        }
        
    }

    //Dibuja las fichas que se encuentran en el arreglo de fichas del jugador
    dibujarFichas(){
        this.fichas.forEach(ficha => {
            ficha.draw();
        });
    }

    //Retornas las fichas del arreglo del jugador
    obtenerFichas(){
        return this.fichas;
    }
}