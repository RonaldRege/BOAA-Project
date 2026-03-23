// log in page for C.I.M.S.

function checkLogin() { //runs when called (onclick)
  // demo login info 
  const correctUser = "admin";
  const correctPass = "cims123";

  // get info typed (whole webpage,  get- find the input box with the id user, get whats typed)
  // hard code 
  const user = document.getElementById("user").value; // find the username input box and store what was typed
  const pass = document.getElementById("pass").value;

  // check if correct, go to dashboard
  //if (user === correctUser && pass === correctPass) {
  // window.location.href = "dashboard.html"; //changes page
  // } else {
  // show error 
  // document.getElementById("error").style.display = "block"; //
  // }
  //

  // check if it is correct or incorrect 

  const errorMessage = document.getElementById("error"); //login errors

  errorMessage.style.display = "none"; // hide error message (reset to start clean)

  //check if empty username
  if (user === "") {
    errorMessage.textContent = "Please enter a username";
    errorMessage.style.display = "block"; //visable error
    return;
  }

  //check if empty password 
  if (pass === "") {
    errorMessage.textContent = "Please enter a password";
    errorMessage.style.display = "block"; //visable error
    return;
  }

  // check user input 
  if (user === correctUser && pass === correctPass) {
    // store value in browser session (loged in)
    sessionStorage.setItem("loggedIn", "true"); // store value in browser (user has logged in)
    sessionStorage.setItem("username", "user"); // store username in browser

    // change to the dashboard page 
    window.location.href = "dashboard.html"; // kinda simulates entering the system after "authentication"

  } else {
    errorMessage.textContent = "wrong username or password. Please try again";
    errorMessage.style.display = "block"; //visable error
  }
}