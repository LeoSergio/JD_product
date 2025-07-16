const carrinho = [];

function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  alert(`${nome} adicionado ao carrinho!`);
}

function toggleCarrinho() {
  const container = document.getElementById('carrinho-container');
  const overlay = document.getElementById('overlay');
  container.classList.toggle('ativo');
  overlay.classList.toggle('ativo');
  if (container.classList.contains('ativo')) {
    mostrarCarrinho();
  }
}


function mostrarCarrinho() {
  const lista = document.getElementById('carrinho-itens');
  const totalSpan = document.getElementById('total');
  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const linha = document.createElement('p');
    linha.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(linha);
    total += item.preco;
  });

  totalSpan.textContent = total.toFixed(2);
}

function confirmarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra confirmada! Obrigado pela preferência.");
  carrinho.length = 0;
  mostrarCarrinho();
  document.getElementById('carrinho-container').classList.remove('ativo');
}

// Fecha carrinho ao clicar fora dele
document.getElementById('overlay').addEventListener('click', () => {
  toggleCarrinho();
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('ativo');
}
function abrirMenu() {
  document.getElementById('menu-box').classList.add('ativo');
  document.getElementById('menu-overlay').classList.add('ativo');
}

function fecharMenu() {
  document.getElementById('menu-box').classList.remove('ativo');
  document.getElementById('menu-overlay').classList.remove('ativo');
}



function abrirMenu() {
  document.getElementById('menu-box').classList.add('ativo');
}

function fecharMenu() {
  document.getElementById('menu-box').classList.remove('ativo');
}


