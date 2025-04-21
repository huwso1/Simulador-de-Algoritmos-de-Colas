
class Proceso{

    constructor(nombre,llegada, tiempoEjecucion,Bloqueo1I,Bloqueo1e,Bloqueo2I,Bloqueo2e,Bloqueo3I,Bloqueo3e){
        this.nombre=nombre;
        this.llegada=llegada;
        this.tiempoEjecucion=tiempoEjecucion;
        this.Bloqueo1I=Bloqueo1I;
        this.Bloqueo1e=Bloqueo1e;
        this.Bloqueo2I=Bloqueo2I;
        this.Bloqueo2e=Bloqueo2e;
        this.Bloqueo3I=Bloqueo3I;
        this.Bloqueo3e=Bloqueo3e;
        this.isblocked=false;
        this.iswaiting=true;
        this.tiempoEjecutado=0;
        this.tiempoBloqueo=0;
        this.tiempoDesdeInicio=0;
        this.isOver=false;
    }
    notify(){
    this.tiempoDesdeInicio++;
    if(!this.iswaiting && !this.isblocked){
        console.log(this.nombre+"Se esta ejecutando");
        this.tiempoEjecutado++;
    }
    this.BloqueodeProceso();
   
    if(this.isblocked){
        
        if(this.tiempoBloqueo==0){
            
            this.desbloquearProceso();
        }
        this.tiempoBloqueo--;
    }
    if(this.tiempoEjecutado==this.tiempoEjecucion){
        this.terminarProceso();
    }
    
    }
    BloqueodeProceso(){
        if(this.isblocked){
            console.log(this.tiempoBloqueo);
            console.log("no se puede bloquear mas");
            return;
        }
        if(this.tiempoEjecutado==this.Bloqueo1I){
            this.BloquearProceso();
            this.tiempoBloqueo=this.Bloqueo1e;
        }
        if( this.tiempoEjecutado==this.Bloqueo2I){
            this.BloquearProceso();
            this.tiempoBloqueo=this.Bloqueo2e;
        }
        if( this.tiempoEjecutado==this.Bloqueo3I ){
            this.BloquearProceso();
            this.tiempoBloqueo=this.Bloqueo3e;
    }
    
}
    BloquearProceso(){
        this.isblocked=true;
    }
    desbloquearProceso(){
        this.isblocked=false;
    }
    terminarProceso(){
        this.isOver=true;
    }
    PonerenEspera(){
        console.log("Estoy esperando");
        this.iswaiting=true;
    }
    PonerenEjecucion(){
        this.iswaiting=false;
    }

}
export default Proceso;