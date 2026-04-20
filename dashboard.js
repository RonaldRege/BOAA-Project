// dashboard.js

// store values from sessionStorage
const loggedIn = sessionStorage.getItem("loggedIn");
const username = sessionStorage.getItem("username");
const role = sessionStorage.getItem("role") || "member"; // if no role exist defalt to member

// check 
if (loggedIn !== "true") {
  window.location.href = "index.html";
}

// admin/board 
function canManage() {
  return role === "admin" || role === "board";
}

function applyHistoryAccess(){
  const role = sessionStorage.getItem("role") || "member";
  const historyTab = document.getElementById("historyTab");

  if (historyTab&& role !== "admin" && role !== "board"){
    historyTab.style.display = "none";
  }
}

// welcome text and access level
function applyRolePermissions() { //search for page elements by ID
  const welcomeMessage = document.getElementById("welcomeMessage");
  //const roleMessage = document.getElementById("roleMessage");

  if (welcomeMessage && username) {
    welcomeMessage.textContent = "Hello " + username + "!";
  }

  // finds admin/board control section on different pages
  if (canManage()) {
    const inventoryControls = document.getElementById("inventoryManagementControls");
    const eventsControls = document.getElementById("eventsManagementControls");
    const membersControls = document.getElementById("membersManagementControls");

    // if the section exist on the page then remove the hidden class so it can be visable 
    if (inventoryControls) {
      inventoryControls.classList.remove("hidden");
    }

    if (eventsControls) {
      eventsControls.classList.remove("hidden");
    }

    if (membersControls) {
      membersControls.classList.remove("hidden");
    }
  }
}

// display message
function showStatus(message) {
  const statusMessage = document.getElementById("statusMessage");
  if (statusMessage) {
    statusMessage.textContent = message;
  }
}

// logout/ clears and sends back to log in page
function logout() {
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("role");
  window.location.href = "index.html";
}
// runs when page loads 
applyRolePermissions();
applyHistoryAccess();
