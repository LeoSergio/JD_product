// ----- INICIALIZAÇÃO E PERSISTÊNCIA -----
let carrinho = carregarCarrinho(); // Carrega imediatamente

function salvarCarrinho() {
  localStorage.setItem('carrinhoDeCompras', JSON.stringify(carrinho));
}

function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem('carrinhoDeCompras');
  return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
}

// ----- GERENCIAMENTO DO CARRINHO -----
function adicionarCarrinho(nome, preco) {
  const precoNumerico = parseFloat(preco);
  if (!nome || isNaN(precoNumerico) || precoNumerico <= 0) {
    mostrarNotificacao("Dados do produto inválidos.", 'erro');
    return;
  }
  
  carrinho.push({ nome, preco: precoNumerico });
  salvarCarrinho();
  mostrarCarrinho();
  atualizarContadorCarrinho();
  mostrarNotificacao(`${nome} adicionado ao carrinho!`);
}

function removerDoCarrinho(index) {
  if (index >= 0 && index < carrinho.length) {
    const itemRemovido = carrinho[index].nome;
    carrinho.splice(index, 1);
    salvarCarrinho();
    mostrarCarrinho();
    atualizarContadorCarrinho();
    mostrarNotificacao(`${itemRemovido} removido do carrinho!`, 'aviso');
  }
}

function atualizarContadorCarrinho() {
  const contador = document.getElementById('carrinho-contador');
  contador.textContent = carrinho.length;
}

function mostrarCarrinho() {
  const lista = document.getElementById('carrinho-itens');
  const totalSpan = document.getElementById('total');
  lista.innerHTML = '';
  let total = 0;
  
  carrinho.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-carrinho';
    itemDiv.innerHTML = `
      <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
      <button class="remover-item" onclick="removerDoCarrinho(${index})">-</button>
    `;
    lista.appendChild(itemDiv);
    total += item.preco;
  });
  
  totalSpan.textContent = total.toFixed(2);
}

// ----- FUNÇÃO DE CONFIRMAÇÃO PARA WHATSAPP -----
function confirmarCompra() {
  if (carrinho.length === 0) {
    mostrarNotificacao("Seu carrinho está vazio!", 'erro');
    return;
  }

  const numeroWhatsApp = "5584998669329";
  let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
  let total = 0;

  carrinho.forEach(item => {
    mensagem += `*Produto:* ${item.nome}\n`;
    mensagem += `*Preço:* R$ ${item.preco.toFixed(2)}\n\n`;
    total += item.preco;
  });

  mensagem += `*Total do Pedido: R$ ${total.toFixed(2)}*`;
  const mensagemCodificada = encodeURIComponent(mensagem);
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

  window.open(urlWhatsApp, "_blank");
}

// ----- CONTROLE DE INTERFACE (UI) -----
function toggleMenu() {
  const menuBox = document.getElementById('menu-box');
  const menuOverlay = document.getElementById('menu-overlay');
  menuBox.classList.toggle('ativo');
  menuOverlay.classList.toggle('ativo');
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

function fecharCarrinho() {
  document.getElementById('carrinho-container').classList.remove('ativo');
  document.getElementById('overlay').classList.remove('ativo');
}

function mostrarNotificacao(mensagem, tipo = 'sucesso') {
  const notificacao = document.getElementById('notificacao');
  notificacao.textContent = mensagem;
  notificacao.className = 'notificacao';
  notificacao.classList.add(tipo, 'ativo');
  
  setTimeout(() => {
    notificacao.classList.remove('ativo');
  }, 3000);
}

// ----- INICIALIZAÇÃO -----
document.addEventListener('DOMContentLoaded', () => {
  // Já carregamos o carrinho no início
  atualizarContadorCarrinho();
  mostrarCarrinho();
  
  // Event Listeners
  document.getElementById('overlay').addEventListener('click', fecharCarrinho);
  document.getElementById('menu-overlay').addEventListener('click', toggleMenu);
  
  // Botão de fechar carrinho
  document.getElementById('fechar-carrinho').addEventListener('click', fecharCarrinho);
});