const numRowsInput = document.getElementById("numRows");
const createTableBtn = document.getElementById("createTableBtn");
const tableContainer = document.getElementById("tableContainer");
const simulateBtnFCFS = document.getElementById("simulateBtnFCFS");
const simulateBtnSJF = document.getElementById("simulateBtnSJF");
const simulateBtnSRTF = document.getElementById("simulateBtnSRTF");
const simulateBtnRR = document.getElementById("simulateBtnRR");

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
    const row = document.createElement("tr");
    row.dataset.processId = i;

    // Proceso ID 
    const idCell = document.createElement("td");
    idCell.textContent = `P${i}`;
    row.appendChild(idCell);

    // Llegada y ejecución
    const llegadaCell = document.createElement("td");
    llegadaCell.appendChild(generateTextInput("Llegada"));
    row.appendChild(llegadaCell);

    const ejecucionCell = document.createElement("td");
    ejecucionCell.appendChild(generateTextInput("Ejecución"));
    row.appendChild(ejecucionCell);

    // Bloqueos
    for (let i = 0; i < 3; i++) {
      const inicioCell = document.createElement("td");
      inicioCell.appendChild(generateTextInput("Inicio"));
      row.appendChild(inicioCell);

      const duracionCell = document.createElement("td");
      duracionCell.appendChild(generateTextInput("Duración"));
      row.appendChild(duracionCell);
    }

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
});
