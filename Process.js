
import Bloqueo from './Bloqueo.js';
class Proceso{

    constructor(nombre,llegada,tiempoEjecucion,Bloqueo1I,Bloqueo1e,Bloqueo2I,Bloqueo2e,Bloqueo3I,Bloqueo3e){
        
        this.nombre=nombre;
        this.llegada=llegada;
        this.tiempoEjecucion=tiempoEjecucion;
        this.Respuesta=false;
        this.tiempoDeRespuesta=undefined;
        this.Bloqueo1=new Bloqueo(Bloqueo1I,Bloqueo1e);
        this.Bloqueo2=new Bloqueo(Bloqueo2I,Bloqueo2e);
        this.Bloqueo3=new Bloqueo(Bloqueo3I,Bloqueo3e);
        this.isblocked=false;
        this.iswaiting=true;
        this.tiempoEjecutado=0;
        this.tiempoBloqueo=0;
        this.tiempoDesdeInicio=0;
        this.isOver=false;
        this.started=false;
    }
    notify(){
        //Si el proceso ya comenzo y no ha terminado.
    if(this.started && !this.isOver){
        console.log(this.tiempoEjecutado);
        this.tiempoDesdeInicio++;
        //Si no esta esperando, o esta bloqueado aumenta el tiempo de ejecucion.
        if(!this.iswaiting && !this.isblocked){
            this.tiempoEjecutado++;
        }
        if(this.isblocked){
            this.tiempoBloqueo--;
        }
    }
    if(this.tiempoEjecucion==this.tiempoEjecutado){
        this.terminarProceso();
    }
    
    
    }
    BloqueodeProceso(){
        if(this.tiempoEjecutado==this.Bloqueo1.inicio && !this.Bloqueo1.ejecutado){
            this.tiempoBloqueo=this.Bloqueo1.ejecutarBloqueo();
            
            return true;
        }
        if( this.tiempoEjecutado==this.Bloqueo2.inicio && !this.Bloqueo2.ejecutado){
            this.tiempoBloqueo=this.Bloqueo2.ejecutarBloqueo();
            return true;
        }
       
        if( this.tiempoEjecutado==this.Bloqueo3.inicio && !this.Bloqueo3.ejecutado ){
            this.tiempoBloqueo=this.Bloqueo3.ejecutarBloqueo();
            return true;
    }
    return false;
    
}
    BloquearProceso(){
        this.isblocked=true;
        this.iswaiting=false;
    }
    
    terminarProceso(){
        this.isOver=true;
    }
    PonerenEspera(){
        console.log("Estoy esperando");
        this.isblocked=false;
        this.iswaiting=true;
    }
    IniciarProceso(){
        this.started=true;
    }
    PonerenEjecucion(){
        if(!this.Respuesta){
            this.tiempoDeRespuesta=this.tiempoDesdeInicio;
        }
        this.isblocked=false;
        this.iswaiting=false;
    }

}
export default Proceso;