import Proceso from './Process.js';
import Algorithm from './Algorithm.js';
class FCFS extends Algorithm{
    constructor(ProcesosDeSimulacion){
        super();
        this.procesosCargados=[];
        this.procesos=ProcesosDeSimulacion;
        this.subscribers=[];
        this.loadProcess();
        console.log(this.procesosCargados);
        this.cola=[];
        this.relojdelsistema=0;
        //Para propositos de prueba se utiliza este arreglo
        this.drawinconsole=[];
        for(var i=0; i<this.procesos.length;i++){
            this.drawinconsole.push([]);
        }
        
    }

    start(){
        setInterval(()=>{this.FCFSAl()},1000)
    }
    //Avisar a los suscriptores de un cambio
    notify(){
        this.procesosCargados.forEach(Process=>{
            Process.notify();
        })

    }
    //Suscribirse al reloj del algoritmo
    subscribe(suscriptor){}

    FCFSAl(){
        var ProcesoActual;
        //Primero revisa los procesos cargados, para revisar cuales entrarian en Cola de acuerdo al reloj del sistema.
        this.procesosCargados.forEach(Process=>{
            if(Process.llegada>=this.relojdelsistema && !Process.isblocked){
                Process.PonerenEspera();
                this.cola.push(Process);
            }
        })
        
        var ProcesoActual=this.cola.at(0);
        if(ProcesoActual.isblocked){
            this.cola.splice(0,1);
        }
        this.cola.at(0).PonerenEjecucion();
        
        this.drawProcess();
        this.notify();
        this.relojdelsistema++;
    }
    loadProcess(){
        this.procesos.forEach(Process => {
    
            var nombre=Process[0].value;
            var llegada=Process[1].value;
            var tiempoEjecucion=Process[2].value;
            var Bloqueo1I=Process[3].value;
            var Bloqueo1e=Process[4].value;
            var Bloqueo2I=Process[5].value;
            var Bloqueo2e=Process[6].value;
            var Bloqueo3I=Process[7].value;
            var Bloqueo3e=Process[8].value;
            this.procesosCargados.push(new Proceso(nombre,llegada,tiempoEjecucion,Bloqueo1I
                ,Bloqueo1e,Bloqueo2I,Bloqueo2e,Bloqueo3I,Bloqueo3e))
            
        });
        console.log(this.procesosCargados);
            
        };
        drawProcess(){
            for(var i=0;i<this.drawinconsole.length;i++){
                if(this.procesosCargados[i].isblocked){
                    this.drawinconsole[i].push("-");
                }
                if(this.procesosCargados[i].iswaiting){
                    this.drawinconsole[i].push(".");
                }
                if(!this.procesosCargados[i].iswaiting && !this.procesosCargados[i].isblocked){
                    this.drawinconsole[i].push("+");
                }
            }
            for(var i=0;i<this.drawinconsole.length;i++){
                console.log(this.drawinconsole[i]);
            }
        }
    }
    export default FCFS;
