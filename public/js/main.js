// NOTYF

const notyf = new Notyf();
document.addEventListener("DOMContentLoaded", () => {
  const error = document.body.dataset.error;

  if (error && error !== "undefined" && error.trim() !== "") {
    notyf.error(error);
  }
});

// LOGIN VALIDATOR

const loginEmail = document.querySelector("#loginFieldEmail");
const loginPassword = document.querySelector("#loginFieldPassword");
const loginBtnSubmit = document.querySelector("#loginBtnSubmit");

loginBtnSubmit.addEventListener("click", (e) => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  console.log("email", email);
  console.log("password", password);

  if (!email) {
    e.preventDefault();
    notyf.error("Email is required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(email)) {
    e.preventDefault();
    notyf.eror("Invalid email");
    return;
  }

  if (!password) {
    e.preventDefault();
    notyf.error("Password is required");
    return;
  }

  if (password.length < 8) {
    e.preventDefault();
    notyf.error("Password must be at least 8 characters");
    return;
  }
});
