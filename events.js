// events.js

let eventsData = JSON.parse(localStorage.getItem("eventsData")) || [
  {
    title: "Open House",
    date: "April 20, 2026",
    time: "3:00 PM",
    location: "Student Union",
    members: []
  },
  {
    title: "Club Meeting",
    date: "April 22, 2026",
    time: "6:00 PM",
    location: "Room 102",
    members: []
  }
];

// make sure every event has a members array
eventsData = eventsData.map(function(event) {
  return {
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    members: Array.isArray(event.members) ? event.members : []
  };
});

localStorage.setItem("eventsData", JSON.stringify(eventsData));

// checks if user is admin or board
function canManageEvents() {
  const role = sessionStorage.getItem("role") || "member";
  return role === "admin" || role === "board";
}

// checks if the typed name is in the members list
function isValidMember(name) {
  const membersData = JSON.parse(localStorage.getItem("membersData")) || {
    board: ["John Smith", "Tom Bark"],
    active: ["Mike Jordan", "Luis Hank"],
    admin: ["Prof Jacobs"]
  };

  const trimmedName = name.trim().toLowerCase();

  return (
    membersData.board.some(function(member) {
      return member.toLowerCase() === trimmedName;
    }) ||
    membersData.active.some(function(member) {
      return member.toLowerCase() === trimmedName;
    }) ||
    membersData.admin.some(function(member) {
      return member.toLowerCase() === trimmedName;
    })
  );
}

// draws events on page
function renderEvents() {
  const container = document.getElementById("eventsContainer");
  if (!container) return;

  container.innerHTML = "";

  eventsData.forEach(function(event, index) {
    const card = document.createElement("div");
    card.className = "event-card";

    let actions = "";

    if (canManageEvents()) {
      actions = `
        <button onclick="editEvent(${index})">Edit</button>
        <button onclick="deleteEvent(${index})">Delete</button>
        <button onclick="addMemberToEvent(${index})">Add Member</button>
        <button onclick="removeMemberFromEvent(${index})">Remove Member</button>
      `;
    }

    const memberList =
      event.members.length > 0
        ? event.members.join(", ")
        : "No members assigned";

    card.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Members:</strong> ${memberList}</p>
      ${actions}
    `;

    container.appendChild(card);
  });
}

// create event
function addEvent() {
  if (!canManageEvents()) {
    showStatus("Only admin and board can create events.");
    return;
  }

  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value.trim();
  const time = document.getElementById("eventTime").value.trim();
  const location = document.getElementById("eventLocation").value.trim();

  if (title === "" || date === "" || time === "" || location === "") {
    showStatus("Please fill in all fields.");
    return;
  }

  eventsData.push({
    title: title,
    date: date,
    time: time,
    location: location,
    members: []
  });

  localStorage.setItem("eventsData", JSON.stringify(eventsData));

  document.getElementById("eventTitle").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("eventTime").value = "";
  document.getElementById("eventLocation").value = "";

  renderEvents();
  showStatus("Event added.");
}

// delete event
function deleteEvent(index) {
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

// add member to event
function addMemberToEvent(index) {
  if (!canManageEvents()) {
    showStatus("Only admin and board can assign members.");
    return;
  }

  const event = eventsData[index];

  // make sure members array exists
  if (!Array.isArray(event.members)) {
    event.members = [];
  }

  const memberName = prompt("Enter a member name to assign to this event:");
  if (memberName === null) return;

  const trimmedName = memberName.trim();

  if (trimmedName === "") {
    showStatus("Please enter a member name.");
    return;
  }

  if (!isValidMember(trimmedName)) {
    showStatus("That name is not in the members list.");
    return;
  }

  const alreadyAssigned = event.members.some(function(member) {
    return member.toLowerCase() === trimmedName.toLowerCase();
  });

  if (alreadyAssigned) {
    showStatus("That member is already assigned to this event.");
    return;
  }

  event.members.push(trimmedName);

  localStorage.setItem("eventsData", JSON.stringify(eventsData));

  renderEvents();
  showStatus("Member added to event.");
}

// remove member from event
function removeMemberFromEvent(index) {
  if (!canManageEvents()) {
    showStatus("Only admin and board can remove members.");
    return;
  }

  const event = eventsData[index];

  if (!Array.isArray(event.members) || event.members.length === 0) {
    showStatus("There are no members assigned to this event.");
    return;
  }

  const memberName = prompt("Enter member name to remove:");
  if (memberName === null) return;

  const trimmedName = memberName.trim();

  const memberIndex = event.members.findIndex(function(member) {
    return member.toLowerCase() === trimmedName.toLowerCase();
  });

  if (memberIndex === -1) {
    showStatus("That member is not assigned to this event.");
    return;
  }

  event.members.splice(memberIndex, 1);

  localStorage.setItem("eventsData", JSON.stringify(eventsData));

  renderEvents();
  showStatus("Member removed from event.");
}

// edit event
function editEvent(index) {
  if (!canManageEvents()) {
    showStatus("Only admin and board can edit events.");
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