
// event.js so that it will only run event stuff instead of the dashboard

// sample events 

let eventsData =JSON.parse(localStorage.getItem("eventsData")) || [ //array to hold event objects
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
function renderEvents(){ // draws events on the page
  const container = document.getElementById("eventsContainer");
  if(!container) return; //finds the <div> where the events should go, if not it stops the function

  container.innerHTML=""; // clear old event cards 

  eventsData.forEach((event, index)=>{ //loop through every event in the array
    const card = document.createElement("div"); // create a new div for one event card and give it a class name 
    card.className="event-card";

    let actions = "";

if (role === "admin" || role === "board") {
  actions = `
    <button onclick="editEvent(${index})">Edit</button>
    <button onclick="deleteEvent(${index})">Delete</button>
  `;
}

    // fills the event card with HTML
    //$ insert JS values into the HTML string
     card.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p> 
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      ${actions}
    `;

    container.appendChild(card); //adds new card
  });
}
// create event clicked

function addEvent() {
  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value.trim();
  const time = document.getElementById("eventTime").value.trim();
  const location = document.getElementById("eventLocation").value.trim();

  if(!title|| !date ||!time  ||!location ){
    showStatus("Please fill in all feilds.");
    return;
  }

  eventsData.push({ title, date, time, location }); // adds a new event object to the array

  // reders event and message
  renderEvents();
  showStatus("Events added.");

  localStorage.setItem("eventsData",JSON.stringify(eventsData));
} 

// delete event from array by position
function deleteEvent(index) {
    eventsData.splice(index,1);
    renderEvents();
    showStatus("Event deleted.");

     localStorage.setItem("eventsData",JSON.stringify(eventsData));
}

// edit title 
function editEvent(index){
    const event = eventsData[index];

    const newTitle = prompt("Edit event title:", event.title);
    if (newTitle === null) return;

    event.title = newTitle;
    renderEvents();
    showStatus("Event added.");

     localStorage.setItem("eventsData",JSON.stringify(eventsData));
}

renderEvents();