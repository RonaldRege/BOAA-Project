// dashboard.js

const loggedIn = sessionStorage.getItem("loggedIn");
const username = sessionStorage.getItem("username");
const role = sessionStorage.getItem("role") || "member";

// check 
if (loggedIn !== "true") {
  window.location.href = "index.html";
}

// sample events 
let eventsData = [
  {
    title: "Open House",
    date: "April 20, 2026",
    time: "3:00 PM",
    location: "Student Union"
  },

  {
    title: "Club Meeting",
    date: "April 22, 2026",
    time: "6:00 PM",
    location: "Room 102"
  }
];

let membersData = {
  board: ["John Smith", "Tom Bark"],
  active: ["Mike Jordan", "Luis Hank"],
  admin: ["Prof Jacobs"]
};
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

  const selectedSectoin = document.getElementById(tabId);
  if (selectedSection) {
    selectedSection.classList.add("active");
  }

  if (clickedButton) {
    clickedButton.classList.add("active");
  }
}

// welcome text and access level
function applyRolePermissions() {
  const welcomeMessage = document.getElementById("welcomeMessage");
  const roleMessage = document.getElementById("roleMessage");

  if (welcomeMessage && username) {
    welcomeMessage.textContent = "Hello " + username + "!";
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

// events 
function renderEvents(){
  const eventsContainer = document.getElementById("eventsContainer");
  if(!eventsContainer) return;

  eventsContainer.innerHTML="";

  eventsData.forEach((event)=>{
    const card = document.createElement("div");
    card.className="event-card";

     card.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
    `;

    eventsContainer.appendChild(card);
  });
}

function addEvent() {
  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value.trim();
  const time = document.getElementById("eventTime").value.trim();
  const location = document.getElementById("eventLocation").value.trim();

  if(title ===""|| date ===""|| time ==="" || location ===""){
    showStatus("Please fill in all event feilds.");
    return;
  }

  eventsData.push({
    title: title,
    date: date,
    time: time, 
    location: location
  });

  document.getElementById("eventTitle").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("eventTime").value = "";
  document.getElementById("eventLocation").value = "";

  renderEvents();
  showStatus("Event created.");
}

// members

function renderMembers(){
  const boardList = document.getElementById("boardMembersList");
  const activeList = document.getElementById("activeMembersList");
  const adminList = document.getElementById("adminMembersList");

  if (!boardList || !activeList || !adminList) return;

  boardList.innerHTML = "";
  activeList.innerHTML = "";
  adminList.innerHTML = "";

  membersData.board.forEach((name)=>{
    const li = document.createElement("li");
    li.textContent = name;
    boardList.appendChild(li);
  });

   membersData.board.forEach((name)=>{
    const li = document.createElement("li");
    li.textContent = name;
    activeList.appendChild(li);
  });

   membersData.board.forEach((name)=>{
    const li = document.createElement("li");
    li.textContent = name;
    adminList.appendChild(li);
  });
}

function addMember() {
  const name = document.getElementById ("membersName").value.trim();
  const group = document.getElementById ("membersGroup").value.trim();
if (name === ""){
  showStatus("Please enter a member name.");
  return;
}

membersData[group].push(name);
document.getElementById("memberName").value = "";

renderMembers();
showStatus("Member added.");
}

// page

if(typeof renderInventory === "function") {
  renderInventory();
}

renderEvents();
renderMembers();
applyRolePermissions();
