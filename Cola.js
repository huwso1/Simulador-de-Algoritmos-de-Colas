import TablondeProceso from "./TablondeProceso.js";
class Cola extends TablondeProceso{

    constructor(kanvas,numerodeProcesos){
        super(kanvas,numerodeProcesos);
        this.gridSize=20;
        this.kanvas.height=20;
        this.kanvas.width=numerodeProcesos*20;
        this.dibujarCuadricula();
    }
    Clean(){
        this.ctx.clearRect(0,0,this.kanvas.width,this.kanvas.height);
        this.dibujarCuadricula();
    }
    notify(ColaDeProcesos){
        this.Clean();
        for(var i=0;i<ColaDeProcesos.length;i++){
            console.log(ColaDeProcesos.at(i).nombre);
            super.writeTextInCell(i,0,ColaDeProcesos.at(i).nombre);
            ColaDeProcesos.at(i).name;
        }

    }
}
export default Cola;