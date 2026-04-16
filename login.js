// was app.js now its login.js
//log in page for C.I.M.S.
//authentication

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

  const users = [
    { username: "Admin", password: "cims123", role: "Admin" },
    { username: "Board Member", password: "board123", role: "Board Member" },
    { username: "Member", password: "member123", role: "Member" }
  ];

  // log in page for C.I.M.S.

  /*const usersDatabase = [
    { username: "admin", password: null,
       role: "admin", status: "active" },
    { username: "board", password: null, 
      role: "board", status: "active" },
    { username: "member", password: null, 
      role: "member", status: "active" }
  ];
  
    //username required
    if (user === "") {
      errorMessage.textContent = "Please enter a username";
      errorMessage.style.display = "block";
      return;
    }
  
    //username must exist
    const foundUser = usersDatabase.find(u => u.username === user);
  
    if (!foundUser) {
      errorMessage.textContent = "Username does not exist.";
      errorMessage.style.display = "block";
      return;
    }
  
    //create password new account
    if (foundUser.password === null) {
      if (pass === "") {
        errorMessage.textContent = "Please create a password to continue.";
        errorMessage.style.display = "block";
        return;
      }
  
      // Save password
      foundUser.password = pass;
    } 
    // returning user
    else {
      if (pass === "") {
        errorMessage.textContent = "Please enter your password.";
        errorMessage.style.display = "block";
        return;
      }
  
      if (foundUser.password !== pass) {
        errorMessage.textContent = "Incorrect password.";
        errorMessage.style.display = "block";
        return;
      }
    }
  
    // authentication
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", foundUser.username);
    sessionStorage.setItem("role", foundUser.role);
  
    window.location.href = "dashboard.html";
  }
  */
  //

  const foundUser = users.find(function(account) {
    return account.username === user && account.password === pass
});

  if (foundUser) {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", user);
    sessionStorage.setItem("role", "admin");
    window.location.href = "dashboard.html";
  } else {
    errorMessage.textContent = "Wrong username or password. Please try again";
    errorMessage.style.display = "block"; //visable error
  }
}

/* if (user === adminUser && pass === adminPass) {
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

  }
  
 else {
  errorMessage.textContent = "Wrong username or password. Please try again";
  errorMessage.style.display = "block"; //visable error
}
} */ 