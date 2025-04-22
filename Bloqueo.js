class Bloqueo{
    constructor(inicio,duracion){
        this.inicio=inicio;
        this.duracion=duracion;
        this.ejecutado=false;
    }
    ejecutarBloqueo(){
        this.ejecutado=true;
        return this.duracion;
    }
}
export default Bloqueo;