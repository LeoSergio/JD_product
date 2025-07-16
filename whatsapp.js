function enviarParaWhatsApp() {
  const carrinho = window.carrinho || []; // usa a mesma lista global
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Gostaria de confirmar meu pedido:\n";

  let total = 0;
  carrinho.forEach(item => {
    mensagem += `- ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    total += item.preco;
  });

  mensagem += `Total: R$ ${total.toFixed(2)}`;

  // Codifica a mensagem para URL
  const mensagemCodificada = encodeURIComponent(mensagem);

  // Seu número de WhatsApp com DDD (sem espaços ou traços)
  const numero = "5584998669329";

  // Monta o link
  const url = `https://wa.me/${numero}?text=${mensagemCodificada}`;

  // Abre o WhatsApp (funciona no celular e PC)
  window.open(url, "_blank");
}
