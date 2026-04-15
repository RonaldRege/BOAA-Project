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

// switch tabs
function showTab(tabId, clickedButton) {
  const sections = document.querySelectorAll(".tab-section");
  const buttons = document.querySelectorAll(".tab-button");

  sections.forEach((section) => {
    section.classList.remove("active-section");
  });

  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active-section");
  clickedButton.classList.add("active");
}

// welcome text and access level
function applyRolePermissions() {
  const welcomeMessage = document.getElementById("welcomeMessage");
  const roleMessage = document.getElementById("roleMessage");

  if (welcomeMessage && username) {
    welcomeMessage.textContent = "Hello, " + username + "!";
  }

  if (roleMessage) {
    roleMessage.textContent = "Access level: " + role;
  }

  if (canManage()) {
    document.getElementById("inventoryManagementControls").classList.remove("hidden");
    document.getElementById("eventsManagementControls").classList.remove("hidden");
    document.getElementById("membersManagementControls").classList.remove("hidden");
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

// load page content
if (typeof renderInventory === "function") {
  renderInventory();
}
if (typeof renderEvents === "function") {
  renderEvents();
}
if (typeof renderMembers === "function") {
  renderMembers();
}

applyRolePermissions();