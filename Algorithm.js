//Esta clase actua como una interfaz
class Algorithm{
    //Iniciar la ejecucion del algoritmo
    start(){}
    //Avisar a los suscriptores de un cambio
    notify(){}
    //Suscribirse al reloj del algoritmo
    subscribe(suscriptor){}
    
}
export default Algorithm;
export const FCFS="FCFS";
export const SJF="SJF";
export const RR="RR";
export const SRTF="SRTF";
