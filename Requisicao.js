document.addEventListener("DOMContentLoaded", () => {
  const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
  const livroTituloElement = document.getElementById("livro-titulo");
  const mensagemContainer = document.createElement("div");
  document.body.prepend(mensagemContainer);

  // Função para exibir a mensagem de confirmação
  const exibirMensagem = (titulo, tipo) => {
    const mensagem = document.createElement("div");
    mensagem.className =
      tipo === "sucesso" ? "alert alert-success" : "alert alert-cancelado";
    mensagem.innerText =
      tipo === "sucesso"
        ? `Empréstimo de "${titulo}" foi solicitado com sucesso!`
        : `Empréstimo do livro "${titulo}" foi cancelado!`;
    mensagemContainer.prepend(mensagem);
    setTimeout(() => mensagem.remove(), 4000);
  };

  // Função para manipular a confirmação do empréstimo
  const manipularEmprestimo = (titulo, tipo) => {
    exibirMensagem(titulo, tipo);
    modal.hide();
  };

  // Delegação de eventos para os botões de solicitar empréstimo
  document
    .getElementById("livros-container")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-warning")) {
        const titulo = event.target
          .closest(".card")
          .querySelector(".card-title").innerText;
        livroTituloElement.innerText = titulo;
        modal.show();

        document.getElementById("confirmar-emprestimo").onclick = () =>
          manipularEmprestimo(titulo, "sucesso");
        document.getElementById("cancelar-emprestimo").onclick = () =>
          manipularEmprestimo(titulo, "cancelado");
      }
    });

  // Função para mostrar/ocultar descrição adicional
  const toggleLerMais = document.getElementById("toggleLerMais");
  const lerMaisContent = document.getElementById("ler-mais");

  toggleLerMais.addEventListener("click", (event) => {
    event.preventDefault();
    if (lerMaisContent.style.display === "none") {
      lerMaisContent.style.display = "inline";
      toggleLerMais.textContent = "Ler menos";
    } else {
      lerMaisContent.style.display = "none";
      toggleLerMais.textContent = "Ler mais";
    }
  });
});
