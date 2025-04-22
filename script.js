import AlgorithmFactory from './AlgorithmFactory.js';
import * as constants from './Algorithm.js';
import TablondeProceso from './TablondeProceso.js';
const numRowsInput = document.getElementById("numRows");
const createTableBtn = document.getElementById("createTableBtn");
const tableContainer = document.getElementById("tableContainer");
const simulateBtnFCFS = document.getElementById("simulateBtnFCFS");
const simulateBtnSJF = document.getElementById("simulateBtnSJF");
const simulateBtnSRTF = document.getElementById("simulateBtnSRTF");
const simulateBtnRR = document.getElementById("simulateBtnRR");
const Alogirthmfr=new AlgorithmFactory();
let kanvas;

//En esta variable se guardan los campos que contienen los datos de cada proceso
let CamposDeProcesos= [];
//Estas constantes indican el tipo de algoritmo escogido


function generateTextInput(placeholder = "") {
  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = placeholder;
  input.min = "1";

  input.addEventListener("keydown", function(event) {
    if (event.key === '-') {
      event.preventDefault(); // Evita que se escriba el carácter "-"
    }
  });
  return input;
}

function createTableHeader() {
  const thead = document.createElement("thead");

  const headerRow = document.createElement("tr");
  const headers = ["Proceso", "Llegada", "Ejecución", "Bloqueo 1", "Bloqueo 2", "Bloqueo 3"];
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    if (header.startsWith("Bloqueo")) th.colSpan = 2;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  const subHeaderRow = document.createElement("tr");
  const subHeaders = ["", "", "", "Inicio", "Duración", "Inicio", "Duración", "Inicio", "Duración"];
  subHeaders.forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    subHeaderRow.appendChild(th);
  });
  thead.appendChild(subHeaderRow);

  return thead;
}

function createTableBody(numRows) {
  const tbody = document.createElement("tbody");
  for (let i = 0; i < numRows; i++) {
    var Camposdesimulacion =[];
    const row = document.createElement("tr");
    row.dataset.processId = i;

    // Proceso ID 
    const idCell = document.createElement("td");
    var IDProcess='P'+i;
    Camposdesimulacion.push(IDProcess);
    idCell.textContent = `P${i}`;
    row.appendChild(idCell);
    
    // Llegada y ejecución
    const llegadaCell = document.createElement("td");
    const llegadaCellInput=generateTextInput("Llegada");
    //Valores de prueba
    llegadaCellInput.value=0;
    llegadaCell.appendChild(llegadaCellInput);
    row.appendChild(llegadaCell);
    Camposdesimulacion.push(llegadaCellInput);

    const ejecucionCell = document.createElement("td");
    const ejecucionCellInput=generateTextInput("Ejecución");
    ejecucionCellInput.value=15;
    ejecucionCell.appendChild(ejecucionCellInput);
    row.appendChild(ejecucionCell);
   Camposdesimulacion.push(ejecucionCellInput);

    // Bloqueos
    for (let i = 0; i < 3; i++) {
      const inicioCell = document.createElement("td");
      const inicioCellInput=generateTextInput("Inicio")
      inicioCellInput.value=5+i;
      inicioCell.appendChild(inicioCellInput);
      row.appendChild(inicioCell);
    Camposdesimulacion.push(inicioCellInput);

      const duracionCell = document.createElement("td");
      const inputcell=generateTextInput("Duración")
      inputcell.value=2;
      duracionCell.appendChild(inputcell);
      row.appendChild(inputcell);
      Camposdesimulacion.push(inputcell);
    }
    CamposDeProcesos.push(Camposdesimulacion);
    tbody.appendChild(row);
  }

  return tbody;
}

/* Crea la tabla */
function renderTable(numRows) {
  tableContainer.innerHTML = "";
  simulateBtnFCFS.disabled = true;
  simulateBtnSJF.disabled = true;
  simulateBtnSRTF.disabled = true;
  simulateBtnRR.disabled = true;

  if (isNaN(numRows) || numRows < 1) {
    alert("Por favor, ingresa un número válido de procesos.");
    return;
  }

  const table = document.createElement("table");
  table.classList.add("processes-table");

  const thead = createTableHeader();
  const tbody = createTableBody(numRows);

  table.appendChild(thead);
  table.appendChild(tbody);
  tableContainer.appendChild(table);

  simulateBtnFCFS.disabled = false;
  simulateBtnSJF.disabled = false;
  simulateBtnSRTF.disabled = false;
  simulateBtnRR.disabled = false;
  
}

createTableBtn.addEventListener("click", () => {
  const numRows = parseInt(numRowsInput.value, 10);
  renderTable(numRows);
  kanvas=new TablondeProceso(document.getElementById("Cuadricula"),numRows);
});
//Eventos Listener para el click sobre cada boton
simulateBtnSRTF.addEventListener("click", () => {
  
  var SRTFAL=Alogirthmfr.getAlgorithm(constants.SRTF,CamposDeProcesos);
  SRTFAL.subscribe(kanvas);
  SRTFAL.start(); 
});
simulateBtnSJF.addEventListener("click", () => {
  var SJFAL=Alogirthmfr.getAlgorithm(constants.SJF,CamposDeProcesos);
  SJFAL.subscribe(kanvas);
  SJFAL.start();
});
simulateBtnFCFS.addEventListener("click", () => {
  var FCFSAl=Alogirthmfr.getAlgorithm(constants.FCFS,CamposDeProcesos);
  FCFSAl.subscribe(kanvas);
  FCFSAl.start();
});
simulateBtnRR.addEventListener("click", () => {
  var RRAl= Alogirthmfr.getAlgorithm(constants.RR,CamposDeProcesos);
  RRAl.subscribe(kanvas);
  RRAl.start();
});

function debugSimulation(){
  CamposDeProcesos.forEach(proceso =>{
    proceso.forEach(campo=>{
      console.log(campo.value);
    })
  } )
  
}