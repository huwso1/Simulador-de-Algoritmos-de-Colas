import   "./script.js" ;
import FCFS from './FCFS.js';
import * as constants from './Algorithm.js';
import SJF from './SJF.js';
import SRTF from "./SRTF.js";
class AlgorithmFactory {

    constructor(){
    }

 getAlgorithm(type,Procesos){
        if(type==constants.SJF){
            //Aqui se Instancia un algoritmo de tipo RF
            return new SJF(Procesos);
        }
        if(type==constants.FCFS){
            //Aqui se instancia un algoritmo de tipo FCFS
            
            return new FCFS(Procesos);
        }
        if(type==constants.SRTF){
            //Aqui se instancia un algoritmo de tipo SRTF
            return new SRTF(Procesos);
        }
        if(type==constants.RR){
            //Aqui se instancia un algoritmo de tipo RR
            return "";
        }
        return "";
    }

}
export default AlgorithmFactory;