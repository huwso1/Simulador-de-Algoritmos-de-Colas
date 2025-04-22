import Proceso from './Process.js';
import Algorithm from './Algorithm.js';
class SRTF extends Algorithm{
    constructor(ProcesosDeSimulacion){
        super();
        this.metricas=[];
        this.metricasSistema=[];
        this.procesosCargados=[];
        this.procesos=ProcesosDeSimulacion;
        this.subscribers=[];
        this.loadProcess();
        console.log(this.procesosCargados);
        this.cola=[];
        this.relojdelsistema=0;
        //Lista de procesos bloqueados.
        this.procesosBloqueados=[];
        //Para propositos de prueba se utiliza este arreglo
        this.drawinconsole=[];
        for(var i=0; i<this.procesos.length;i++){
            this.drawinconsole.push([this.procesos[i][0]]);

        }
        
    }

    start(){
        this.hilo=setInterval(()=>{this.SRTFAL()},500)
    }
    //Avisar a los suscriptores de un cambio
    notify(){
        this.procesosCargados.forEach(Process=>{
            Process.notify();
        })
        this.subscribers.forEach(suscriber=>{
            suscriber.notify(this.drawinconsole);
        })

    }
    //Suscribirse al reloj del algoritmo
    subscribe(suscriptor){
        this.subscribers.push(suscriptor);
    }

    SRTFAL(){
        var ProcesoActual;
        //Itera sobre los procesos cargados
        this.procesosCargados.forEach(Process=>{
            //Revisa si un proceso ha llegado
            if(Process.llegada==this.relojdelsistema && !Process.started){
                //Marca el proceso como iniciado
                Process.IniciarProceso();
                //Agrega el proceso a la cola de ejecucion
                this.cola.push(Process);
                console.log("El proceso "+Process.nombre+" Ha entado a la cola");
            }
        })
        //Itera sobre los procesos bloqueados y los que se desbloquean se eliminan de la lista de procesos bloqueados.
        for(let i=this.procesosBloqueados.length-1;i>=0;i--){
            console.log(i);
            if(this.procesosBloqueados[i].tiempoBloqueo==0){
                this.procesosBloqueados[i].PonerenEspera();
                this.cola.push(this.procesosBloqueados[i]);
                this.procesosBloqueados.splice(i,1);
            }
        }
        //Se sortea la cola priorizando los procesos con menor tiempo de ejecucion
        
        this.cola=this.cola.sort((a,b)=>{
            return (a.tiempoEjecucion-a.tiempoEjecutado)-(b.tiempoEjecucion-b.tiempoEjecutado);
        })
        console.log(this.cola);
        //El algoritmo revisa quien esta primero en la cola, es decir el proceso con menor tiempo de ejecucion.
        if(this.cola.length==0){
            //No hago nada
        }else{
            ProcesoActual=this.cola.at(0);
            //Revisa si el proceso actual termino
            while(ProcesoActual.isOver){
                //Si termino lo elimina de la cola.
                this.cola.splice(0,1);
                if(this.cola.length!=0){
                    ProcesoActual=this.cola.at(0);
                    }else{
                        ProcesoActual=undefined;
                        //Si no encuentra ningun proceso sin terminar, rompe el ciclo.
                        break;
                    }
            }
            //Revisa que proceso Actual no sea undefined para evitar excepciones
            if(ProcesoActual!=undefined){
            //Revisa si el proceso actual va a bloquearse en este ciclo.
            while(ProcesoActual.BloqueodeProceso()){
                //Si es el caso, Se bloquea y lo elimina de la cola.
                ProcesoActual.BloquearProceso();
                this.procesosBloqueados.push(ProcesoActual);
                this.cola.splice(0,1);
                //Asigna al siguiente proceso en la cola como procesoActual.
                if(this.cola.length!=0){
                ProcesoActual=this.cola.at(0);
                }else{
                    ProcesoActual=undefined;
                    //Si no encuentra ningun proceso que no se vaya a bloquear se salta el ciclo.
                    break;
                }
            }
            }
        }
        //Ejecuta el proceso actual
        if(ProcesoActual!=undefined){
            ProcesoActual.PonerenEjecucion();
        }
        //Dibuja los procesos
        this.drawProcess();
        if(this.cola.length==0 && this.procesosBloqueados.length==0){
            //Termina la simulacion
            this.generateMetrics();
            clearInterval(this.hilo);
        }

        this.relojdelsistema++;
        this.notify();
        
    }
    loadProcess(){
        this.procesos.forEach(Process => {
            
            var nombre=Process[0];
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
                if(this.procesosCargados[i].started && !this.procesosCargados[i].isOver ){
                if(this.procesosCargados[i].isblocked){
                    this.drawinconsole[i].push("-");
                }
                if(this.procesosCargados[i].iswaiting){
                    this.drawinconsole[i].push(".");
                }
                if(!this.procesosCargados[i].iswaiting && !this.procesosCargados[i].isblocked){
                    this.drawinconsole[i].push("+");
                }
            }else{
                this.drawinconsole[i].push(" ");
            }}
            for(var i=0;i<this.drawinconsole.length;i++){
                console.log(this.drawinconsole[i]);
            }
            return drawinconsole;
        }
        generateMetrics(){
            this.procesosCargados.forEach(Process=>{
                let MetricasDelProceso=[];
                //Nombre del proceso
                MetricasDelProceso.push(Process.nombre);
                //Tiempo de ejecucion
                MetricasDelProceso.push(Process.tiempoEjecucion);
                //Tiempo de Respuesta
                MetricasDelProceso.push(Process.tiempoDeRespuesta);
                //Tiempo de bloqueo
                let TiempoDeBloqueo=Process.Bloqueo1.duracion+Process.Bloqueo2.duracion+Process.Bloqueo3.duracion;
                MetricasDelProceso.push(TiempoDeBloqueo);
                //Tiempo de espera
                let TiempoDeEspera=Process.tiempoDesdeInicio-TiempoDeBloqueo-Process.tiempoEjecucion;
                MetricasDelProceso.push(TiempoDeEspera);
                //Tiempo de finalizacion
                MetricasDelProceso.push(Process.tiempoDesdeInicio);
                //Retorno
                let Retorno=Process.tiempoDesdeInicio-Process.llegada;
                MetricasDelProceso.push(Retorno);
                //Tiempo Perdido
                MetricasDelProceso.push(Retorno-Process.tiempoEjecucion);
                //Penalidad
                MetricasDelProceso.push(Retorno/Process.tiempoEjecucion);
                this.metricas.push(MetricasDelProceso);
            })
            this.generateProcessorMetrics();
           return this.metricas;
                }
        //Generar las metricas del procesador
        generateProcessorMetrics(){
            //Tiempo encendido
            this.metricasSistema.push(this.relojdelsistema);
            //Uso total de cpu
            var usoTotal=0;
            this.procesosCargados.forEach(Process=>{
                usoTotal=usoTotal+Process.tiempoEjecucion;
            })
            this.metricasSistema.push(usoTotal);
            //Tiempo de ocio
            this.metricasSistema.push(this.relojdelsistema-usoTotal);
            //Tiempo Promedio de retorno
            let promedioDeRetorno=0;
            for(var i=0;i<this.metricas.length;i++){
                    promedioDeRetorno=promedioDeRetorno+this.metricas[i][6];
            }
            promedioDeRetorno=promedioDeRetorno/this.metricas.length;
            this.metricasSistema.push(promedioDeRetorno);
            //Tiempo Promedio de ejecucion
            let promedioDeEjecucion=0;
            for(var i=0;i<this.metricas.length;i++){
                    promedioDeEjecucion=promedioDeEjecucion+this.metricas[i][1];
            }
            promedioDeEjecucion=promedioDeEjecucion/this.metricas.length;
            this.metricasSistema.push(promedioDeEjecucion);
            //Tiempo Promedio de espera
            let promedioDeEspera=0;
            for(var i=0;i<this.metricas.length;i++){
                promedioDeEspera=promedioDeEspera+this.metricas[i][4];
            }
            promedioDeEspera=promedioDeEspera/this.metricas.length;
            this.metricasSistema.push(promedioDeEspera);
            //Tiempo Promedio de tiempo perdido
            let promedioDeTiempoPerdido=0;
            for(var i=0;i<this.metricas.length;i++){
                promedioDeTiempoPerdido=promedioDeTiempoPerdido+this.metricas[i][7];
            }
            promedioDeTiempoPerdido=promedioDeTiempoPerdido/this.metricas.length;
            this.metricasSistema.push(promedioDeTiempoPerdido);
            return this.metricasSistema;
        }
       
    }
    export default SRTF;
