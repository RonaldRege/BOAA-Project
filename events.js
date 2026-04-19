// events.js so that it will only run event stuff instead of the dashboard

// sample events
let eventsData = JSON.parse(localStorage.getItem("eventsData")) || [ // array to hold event objects
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

// gets role
function canManageEvents() {
  const role = sessionStorage.getItem("role") || "member";
  return role === "admin" || role === "board";
}

// events
function renderEvents() { // draws events on the page
  const container = document.getElementById("eventsContainer");
  if (!container) return; // finds the <div> where the events should go, if not it stops the function

  container.innerHTML = ""; // clear old event cards

  eventsData.forEach((event, index) => { // loop through every event in the array
    const card = document.createElement("div"); // create a new div for one event card and give it a class name
    card.className = "event-card";

    let actions = "";

    if (canManageEvents()) {
      actions = `
        <button onclick="editEvent(${index})">Edit</button>
        <button onclick="deleteEvent(${index})">Delete</button>
      `;
    }

    // fills the event card with HTML
    card.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      ${actions}
    `;

    container.appendChild(card); // adds new card
  });
}

// create event clicked
function addEvent() {
  if (!canManageEvents()) {
    showStatus("Only admin and board can create events."); // just in case the button appears
    return;
  }

  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value.trim();
  const time = document.getElementById("eventTime").value.trim();
  const location = document.getElementById("eventLocation").value.trim();

  if (!title || !date || !time || !location) {
    showStatus("Please fill in all fields.");
    return;
  }

  eventsData.push({ title, date, time, location }); // adds a new event object to the array

  localStorage.setItem("eventsData", JSON.stringify(eventsData));

  // clear the input boxes after creating event
  document.getElementById("eventTitle").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("eventTime").value = "";
  document.getElementById("eventLocation").value = "";

  renderEvents();
  showStatus("Event added.");
}

// delete event from array by position
function deleteEvent(index) {
  // only admin and board
  if (!canManageEvents()) {
    showStatus("Only admin and board can delete events.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this event?");
  if (!confirmDelete) return;

  eventsData.splice(index, 1);

  localStorage.setItem("eventsData", JSON.stringify(eventsData));

  renderEvents();
  showStatus("Event deleted.");
}

// edit
function editEvent(index) {
  if (!canManageEvents()) {
    showStatus("Only admin and board can edit events."); // just in case
    return;
  }

  const event = eventsData[index];

  const newTitle = prompt("Edit event title:", event.title);
  if (newTitle === null) return;

  const newDate = prompt("Edit event date:", event.date);
  if (newDate === null) return;

  const newTime = prompt("Edit event time:", event.time);
  if (newTime === null) return;

  const newLocation = prompt("Edit event location:", event.location);
  if (newLocation === null) return;

  if (
    newTitle.trim() === "" ||
    newDate.trim() === "" ||
    newTime.trim() === "" ||
    newLocation.trim() === ""
  ) {
    showStatus("Please fill in all fields.");
    return;
  }

  event.title = newTitle.trim();
  event.date = newDate.trim();
  event.time = newTime.trim();
  event.location = newLocation.trim();

  localStorage.setItem("eventsData", JSON.stringify(eventsData));

  renderEvents();
  showStatus("Event updated.");
}

renderEvents();