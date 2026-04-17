// inventory.js


// example inventory
let inventoryData = JSON.parse(localStorage.getItem("inventoryData")) || [
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
  if (!tableBody) return;

  const role = sessionStorage.getItem("role") || "member";

  tableBody.innerHTML = "";

  inventoryData.forEach((item, index) => {
    const row = document.createElement("tr");

    let actions = "";

    if (role === "admin" || role === "board") {
      actions = `
        <button onclick="editInventoryItem(${index})">Edit</button>
        <button onclick="deleteInventoryItem(${index})">Delete</button>
      `;
    }

    row.innerHTML = `
      <td>${item.product}</td>
      <td>${item.category}</td>
      <td>${item.location}</td>
      <td>${item.inStock}</td>
      <td>${item.total}</td>
      <td>${item.event}</td>
      <td>${getAvailability(item)}</td>
      <td>${actions}</td>
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

  if (isNaN(inStock) || isNaN(total)) {
    showStatus("In Stock and Total must be numbers.");
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

  localStorage.setItem("inventoryData", JSON.stringify(inventoryData));


  // clear the fill in form boxes
  document.getElementById("itemName").value = "";
  document.getElementById("itemCategory").value = "";
  document.getElementById("itemLocation").value = "";
  document.getElementById("itemStock").value = "";
  document.getElementById("itemTotal").value = "";
  document.getElementById("itemEvent").value = "";

  showStatus("Inventory item added.");
  renderInventory();
}

function editInventoryItem(index) {
  const item = inventoryData[index];

  const newProduct = prompt("Edit product name:", item.product);
  if (newProduct === null) return;

  const newCategory = prompt("Edit category name:", item.category);
  if (newCategory === null) return;

  const newLocation = prompt("Edit location name:", item.location);
  if (newLocation === null) return;

  const newInStock = prompt("Edit in stock name:", item.inStock);
  if (newInStock === null) return;

  const newTotal = prompt("Edit total name:", item.total);
  if (newTotal === null) return;

  const newEvent = prompt("Edit event name:", item.event);
  if (newEvent === null) return;

  if (
    newProduct.trim() === "" ||
    newCategory.trim() === "" ||
    newLocation.trim() === "" ||
    newInStock.trim() === "" ||
    newTotal.trim() === ""
  ) {
    showStatus("Please fill in all required fields.");
    return;
  }
  if (isNaN(newInStock) || isNaN(newTotal)) {
    showStatus("In Stock and Total must be numbers.");
    return;
  }

  item.product = newProduct.trim();
  item.category = newCategory.trim();
  item.location = newLocation.trim();
  item.inStock = Number(newInStock);
  item.total = Number(newTotal);
  item.event = newEvent.trim();

  localStorage.setItem("inventoryData", JSON.stringify(inventoryData));

  renderInventory()
  showStatus("Item updated.");
}

function deleteInventoryItem(index) {
  const confirmDelete = confirm("Are you sure you want to delete this item?");

  if (!confirmDelete) {
    return;
  }

  inventoryData.splice(index, 1);
  localStorage.setItem("inventoryData", JSON.stringify(inventoryData));

  renderInventory()
  showStatus("Item deleted.");
}

renderInventory();