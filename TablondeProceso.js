class TablondeProceso{
    

    constructor(kanvas,numerodeProcesos){
        this.kanvas=kanvas;
        this.ctx= this.kanvas.getContext('2d');
        this.gridSize=20;
        this.kanvas.height=this.gridSize*(numerodeProcesos+1);
        this.dibujarCuadricula();
        
    }
    dibujarCuadricula(){
        // Dibujar líneas verticales
        for (let x = 0; x <= this.kanvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.kanvas.height);
            this.ctx.strokeStyle = '#000000';
            this.ctx.stroke();
        }

        // Dibujar líneas horizontales
        for (let y = 0; y <= this.kanvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.kanvas.width, y);
            this.ctx.strokeStyle = '#000000';
            this.ctx.stroke();
        }

    }
    colorCell(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
    }
    writeTextInCell(x, y, text, color = 'black') {
        this.ctx.fillStyle = color; // Color del texto
        this.ctx.font = "16px Arial"; // Fuente y tamaño del texto
        this.ctx.textAlign = "center"; // Alineación horizontal
        this.ctx.textBaseline = "middle"; // Alineación vertical
        const textX = x * this.gridSize + this.gridSize / 2; // Coordenada X centrada en la celda
        const textY = y * this.gridSize + this.gridSize / 2; // Coordenada Y centrada en la celda
        this.ctx.fillText(text, textX, textY);
    }
    notify(drawinconsole){

        for(var i=0;i<drawinconsole.length;i++){
            for(var j=0;j<drawinconsole[i].length;j++){
                if(drawinconsole[i][0]!="Scheduler"){
                if(drawinconsole[i][j]=='+'){
                    this.colorCell(j,i,"#0fa003");
                }
                if(drawinconsole[i][j]=='-'){
                    this.colorCell(j,i,"#ff0000");
                }
                if(drawinconsole[i][j]=='.'){
                    this.colorCell(j,i,"#979797");
                }
                if(drawinconsole[i][j].length>1){
                    this.writeTextInCell(j,i,drawinconsole[i][j]);
                }
            }else{
                if(drawinconsole[i][j]=='+'){
                    this.colorCell(j,i,"#02c9ff");
                }
                if(drawinconsole[i][j]=='-'){
                    this.colorCell(j,i,"#ff0000");
                }

                if(drawinconsole[i][j].length>1){
                    this.writeTextInCell(j,i,"Sc");
                }
            }
        }
        
        }

    }
}
export default TablondeProceso;