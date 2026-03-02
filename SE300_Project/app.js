// log in page for C.I.M.S.

function checkLogin() { //runs when called (onclick)
  // demo login info 
  const correctUser = "admin";
  const correctPass = "cims123";

  // get info typed (whole webpage,  get- find the input box with the id user, get whats typed)
  const user = document.getElementById("user").value; // find the username input box and store what was typed
  const pass = document.getElementById("pass").value;

  // check if correct, go to dashboard
  if (user === correctUser && pass === correctPass) {
    window.location.href = "dashboard.html"; //changes page
  } else {
    // show error 
    document.getElementById("error").style.display = "block"; //
  }
}