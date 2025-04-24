//Esta clase actua como una interfaz
class Algorithm{
    //Iniciar la ejecucion del algoritmo
    start(){}
    //Avisar a los suscriptores de un cambio
    notify(){}
    //Suscribirse al reloj del algoritmo
    subscribe(suscriptor){}
    //Suscribirse a la cola del algoritmo
    subscribeLine(suscriptor){}
    //Dibujar el proceso
    drawProcess(){}
    //Generar metricas del proceso
    generateMetrics(){};
    //Asignar un evento al terminar
    addTerminationEvent(terminationEvent){}

    
}
export default Algorithm;
export const FCFS="FCFS";
export const SJF="SJF";
export const RR="RR";
export const SRTF="SRTF";
