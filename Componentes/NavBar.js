// Carrega o componente navbar.html dentro da div #navbar
document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar");

  fetch("Componentes/navbar.html")
    .then(res => res.text())
    .then(data => {
      placeholder.innerHTML = data;
    })
    .catch(err => console.error("Erro ao carregar navbar:", err));
});