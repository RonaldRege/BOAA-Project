// dashboard page 
// maybe logout buttion/section

// check 
const loggedIn = sessionStorage.getItem("loggedIn");
const username = sessionStorage.getItem("username");

// if not logged in - back to login page 
if(loggedIn !== "true") {
    window.location.href = "index.html";
}

// if logged in 
const welcomeMessage = document.getElementById("welcomeMessage");
if (welcomeMessage && username) {
    welcomeMessage.textContent = "Hello," + username + "! You are logged in";

}
// logout 
function logout () {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("username");

// return to login page 
window.location.href = "index.html";
}

