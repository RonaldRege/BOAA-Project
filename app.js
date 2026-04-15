// log in page for C.I.M.S.

function checkLogin() { //runs when called (onclick)

  // get info typed (whole webpage,  get- find the input box with the id user, get whats typed)
  // hard code 
  const user = document.getElementById("user").value; // find the username input box and store what was typed
  const pass = document.getElementById("pass").value;
 
//erroe
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

  //demo accouts 
  const adminUser = "admin";
  const adminPass = "cims123";

  const boardUser = "board";
  const boardPass = "board123";

  const memberUser = "member";
  const memberPass = "member123";

  // check all acounts 
  if (user === adminUser && pass === adminPass) {
    // store value in browser session (loged in)
    sessionStorage.setItem("loggedIn", "true"); // store value in browser (user has logged in)
    sessionStorage.setItem("username", "user"); // store username in browser
    sessionStorage.setItem("role","admin");
    window.location.href = "dashboard.html";
  }

    else if (user === adminUser && pass === adminPass) {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", "user"); 
    sessionStorage.setItem("role","board");
    window.location.href = "dashboard.html";
    }

    else if (user === adminUser && pass === adminPass) {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", "user"); 
    sessionStorage.setItem("role","member");
    window.location.href = "dashboard.html";
    }
    
   else {
    errorMessage.textContent = "wrong username or password. Please try again";
    errorMessage.style.display = "block"; //visable error
  }
}