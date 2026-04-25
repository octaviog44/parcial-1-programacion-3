import { registrar } from "../../../services/authService";

const form = document.getElementById("formRegistro") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  registrar(email, password);
});