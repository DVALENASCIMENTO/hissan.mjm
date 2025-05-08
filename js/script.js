const grid = document.getElementById("grid");
const gridSize = 20;
const horizontal = new Array(gridSize).fill(false);
const vertical = new Array(gridSize).fill(false);
const cells = [];

// Cria a grade de células
function criarGrade() {
  grid.innerHTML = '';
  cells.length = 0;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      grid.appendChild(cell);
      cells.push(cell);
    }
  }

  desenhar();
}

// Desenha as linhas e interseções com base nos arrays horizontal[] e vertical[]
function desenhar() {
  for (const cell of cells) {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    cell.innerHTML = "";

    if (horizontal[y]) {
      const linhaH = document.createElement("div");
      linhaH.classList.add("line-h");
      cell.appendChild(linhaH);
    }

    if (vertical[x]) {
      const linhaV = document.createElement("div");
      linhaV.classList.add("line-v");
      cell.appendChild(linhaV);
    }

    if (horizontal[y] && vertical[x]) {
      const ponto = document.createElement("div");
      ponto.classList.add("dot");
      cell.appendChild(ponto);
    }
  }
}

// Evento de clique para alternar manualmente linhas
grid.addEventListener("click", (e) => {
  const rect = grid.getBoundingClientRect();
  const size = rect.width / gridSize;
  const x = Math.floor((e.clientX - rect.left) / size);
  const y = Math.floor((e.clientY - rect.top) / size);

  const offsetX = (e.clientX - rect.left) % size;
  const offsetY = (e.clientY - rect.top) % size;

  if (offsetY < size / 3) {
    horizontal[y] = !horizontal[y];
  } else if (offsetX < size / 3) {
    vertical[x] = !vertical[x];
  }

  desenhar();
});

// Gera as linhas automaticamente com base nos números digitados
function gerarLinhas() {
  // Limpa as linhas anteriores
  horizontal.fill(false);
  vertical.fill(false);

  const n1 = document.getElementById("numero1").value;
  const n2 = document.getElementById("numero2").value;

  if (!n1 || !n2) return;

  // Garante que sempre teremos 3 dígitos
  const digitos1 = n1.toString().padStart(3, '0').split('').map(Number);
  const digitos2 = n2.toString().padStart(3, '0').split('').map(Number);

  const offsetX = 2; // margem inicial horizontal
  const offsetY = 2; // margem inicial vertical
  const espacamento = 4; // espaçamento entre blocos

  // Linhas verticais (↘️) para os dígitos de n1
  for (let i = 0; i < digitos1.length; i++) {
    const valor = digitos1[i];
    for (let l = 0; l < valor; l++) {
      const x = offsetX + i * espacamento + l;
      if (x < gridSize) vertical[x] = true;
    }
  }

  // Linhas horizontais (↙️) para os dígitos de n2
  for (let j = 0; j < digitos2.length; j++) {
    const valor = digitos2[j];
    for (let l = 0; l < valor; l++) {
      const y = offsetY + j * espacamento + l;
      if (y < gridSize) horizontal[y] = true;
    }
  }

  desenhar();
}

// Exporta a imagem do grid
function exportar() {
  html2canvas(document.querySelector("#grid")).then(canvas => {
    const link = document.createElement("a");
    link.download = "multiplicacao-japonesa.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

// Inicializa a grade ao carregar
criarGrade();
