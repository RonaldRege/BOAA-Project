// inventory.js


// example inventory
let inventoryData = JSON.parse(localStorage.getItem("inventoryData"))||[
  {
    product: "Table Cloth",
    category: "Decor",
    location: "Storage Closet",
    inStock: 4,
    total: 6,
    event: "Open House"
  },
  {
    product: "Folding Table",
    category: "Furniture",
    location: "Room 102",
    inStock: 2,
    total: 2,
    event: "Club Meeting"
  }
];

// in stock message - not working

function getAvailability(item) {
  if (item.inStock === 0) {
    return "Out of Stock";
  } else if (item.inStock <= 1) {
    return "Low Stock";
  } else {
    return "Available";
  }
}

// show all items in table
function renderInventory() {
  const tableBody = document.getElementById("inventoryTableBody");
  tableBody.innerHTML = "";

  inventoryData.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.product}</td>
      <td>${item.category}</td>
      <td>${item.location}</td>
      <td>${item.inStock}</td>
      <td>${item.total}</td>
      <td>${item.event}</td>
      <td>${getAvailability(item)}</td>
    `;

    tableBody.appendChild(row);
  });
}

// add new item 

function addInventoryItem() {
  const product = document.getElementById("itemName").value.trim();
  const category = document.getElementById("itemCategory").value.trim();
  const location = document.getElementById("itemLocation").value.trim();
  const inStock = document.getElementById("itemStock").value.trim();
  const total = document.getElementById("itemTotal").value.trim();
  const event = document.getElementById("itemEvent").value.trim();

  if (product === "" || category === "" || location === "" || inStock === "" || total === "") {
    showStatus("Please fill in all the inventory fields.");
    return;
  }

  inventoryData.push({
    product: product,
    category: category,
    location: location,
    inStock: Number(inStock),
    total: Number(total),
    event: event
  });

  showStatus("Inventory item added.");
  renderInventory();

  // clear the fill in form boxes
  document.getElementById("itemName").value = "";
  document.getElementById("itemCategory").value = "";
  document.getElementById("itemLocation").value = "";
  document.getElementById("itemStock").value = "";
  document.getElementById("itemTotal").value = "";
  document.getElementById("itemEvent").value = "";

  localStorage.setItem("inventoryData",JSON.stringify(inventoryData));
}

 renderInventory();