import Proceso from './Process.js';
class Scheduler extends Proceso{

    constructor(quantum){
        super();
        this.nombre="Scheduler";
        this.quantum=quantum;
        this.tiempoEjecutado=0;
        this.tiempoEjecucion=undefined;
        this.started=true;
        this.iswaiting=true;
    
    }
notify(){
    this.tiempoEjecutado++;
    /* Hora de cambiar de proceso.
    if(this.tiempoejecutado==this.quantum){

    }
    */


}
Ejecutar(){
    this.tiempoEjecutado++;
}
ResetEjecucion(){
    this.tiempoEjecutado=0;
}



}
export default Scheduler;