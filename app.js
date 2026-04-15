// app.js

function checkLogin() {
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  const errorMessage = document.getElementById("error");
  errorMessage.style.display = "none";

  if (user === "") {
    errorMessage.textContent = "Please enter a username";
    errorMessage.style.display = "block";
    return;
  }

  if (pass === "") {
    errorMessage.textContent = "Please enter a password";
    errorMessage.style.display = "block";
    return;
  }

  const adminUser = "admin";
  const adminPass = "cims123";

  const boardUser = "board";
  const boardPass = "board123";

  const memberUser = "member";
  const memberPass = "member123";

  if (user === adminUser && pass === adminPass) {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", user);
    sessionStorage.setItem("role", "admin");
    window.location.href = "dashboard.html";
  } else if (user === boardUser && pass === boardPass) {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", user);
    sessionStorage.setItem("role", "board");
    window.location.href = "dashboard.html";
  } else if (user === memberUser && pass === memberPass) {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", user);
    sessionStorage.setItem("role", "member");
    window.location.href = "dashboard.html";
  } else {
    errorMessage.textContent = "Wrong username or password. Please try again";
    errorMessage.style.display = "block";
  }
}