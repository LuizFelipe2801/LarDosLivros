document.addEventListener("DOMContentLoaded", () => {
  const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
  const livroTituloElement = document.getElementById("livro-titulo");
  const mensagemContainer = document.createElement("div");
  document.body.prepend(mensagemContainer);

  // Função para exibir a mensagem de cancelamento
  const exibirMensagem = (titulo, tipo) => {
    const mensagem = document.createElement("div");
    mensagem.className =
      tipo === "sucesso" ? "alert alert-success" : "alert alert-cancelado";
    mensagem.innerText =
      tipo === "sucesso"
        ? `Reserva de "${titulo}" cancelada com sucesso!`
        : `Cancelamento de "${titulo}" foi realizado!`;
    mensagemContainer.prepend(mensagem);
    setTimeout(() => mensagem.remove(), 4000);
  };

  // Delegação de eventos para os botões de cancelar reserva
  document
    .getElementById("livros-container")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-warning")) {
        const titulo = event.target
          .closest(".card")
          .querySelector(".card-title").innerText;
        livroTituloElement.innerText = titulo;
        modal.show();

        document.getElementById("confirmar-emprestimo").onclick = () => {
          exibirMensagem(titulo, "sucesso");
          modal.hide();
        };

        // Botão "Cancelar" apenas fecha o modal
        document.getElementById("cancelar-emprestimo").onclick = () => {
          modal.hide(); // Apenas fecha o modal
        };
      }
    });
});
