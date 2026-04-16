
// event.js so that it will only run event stuff instead of the dashboard

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
renderEvents();