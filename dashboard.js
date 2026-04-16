// dashboard.js

const loggedIn = sessionStorage.getItem("loggedIn");
const username = sessionStorage.getItem("username");
const role = sessionStorage.getItem("role") || "member";

// check 
if (loggedIn !== "true") {
  window.location.href = "index.html";
}


// admin/board 
function canManage() {
  return role === "admin" || role === "board";
}


// welcome text and access level
function applyRolePermissions() {
  const welcomeMessage = document.getElementById("welcomeMessage");
  const roleMessage = document.getElementById("roleMessage");

  if (welcomeMessage && username) {
    welcomeMessage.textContent = "Hello " + username + "!";
  }

  if (canManage()) {
    const inventoryControls = document.getElementById("inventoryManagementControls");
    const eventsControls = document.getElementById("eventsManagementControls");
    const membersControls = document.getElementById("membersManagementControls");

    if (inventoryControls){
      inventoryControls.classList.remove("hidden");
    }

    if (eventsControls){
      eventsControls.classList.remove("hidden");
    }

    if (membersControls){
      membersControls.classList.remove("hidden");
    }
  }
}

//  box
function showStatus(message) {
  const statusMessage = document.getElementById("statusMessage");
  if (statusMessage) {
    statusMessage.textContent = message;
  }
}

// logout
function logout() {
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("role");
  window.location.href = "index.html";
}

applyRolePermissions();
