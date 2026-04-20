// inventory.js

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

let checkoutRecords = JSON.parse(localStorage.getItem("checkoutRecords")) || [];
let selectedCheckoutIndex = null;

function getAvailability(item) {
  if (item.inStock === 0) {
    return "Out of Stock";
  } else if (item.inStock <= 1) {
    return "Low Stock";
  } else {
    return "Available";
  }
}

function canManageInventory() {
  const role = sessionStorage.getItem("role") || "member";
  return role === "admin" || role === "board";
}

function canCheckoutItems() {
  const role = sessionStorage.getItem("role") || "member";
  return role === "admin" || role === "board" || role === "member";
}

function renderInventory() {
  const tableBody = document.getElementById("inventoryTableBody");
  if (!tableBody) return;

  const role = sessionStorage.getItem("role") || "member";
  tableBody.innerHTML = "";

  inventoryData.forEach((item, index) => {
    const row = document.createElement("tr");

    let actions = "";

    if (canCheckoutItems()) {
      actions += `<button onclick="openCheckout(${index})">Check Out</button> `;
      actions += `<button onclick="openReturn(${index})">Return</button> `;
    }

    if (role === "admin" || role === "board") {
      actions += `<button onclick="editInventoryItem(${index})">Edit</button> `;
      actions += `<button onclick="deleteInventoryItem(${index})">Delete</button>`;
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

  showLowStockAlert(role);
}

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

  const inStockNum = Number(inStock);
  const totalNum = Number(total);

  if (isNaN(inStockNum) || isNaN(totalNum)) {
    showStatus("In Stock and Total must be numbers.");
    return;
  }

  if (!Number.isInteger(inStockNum) || !Number.isInteger(totalNum)) {
    showStatus("Please enter whole numbers only.");
    return;
  }

  if (inStockNum < 0 || totalNum < 0) {
    showStatus("Numbers cannot be negative.");
    return;
  }

  inventoryData.push({
    product: product,
    category: category,
    location: location,
    inStock: inStockNum,
    total: totalNum,
    event: event
  });

  localStorage.setItem("inventoryData", JSON.stringify(inventoryData));

  document.getElementById("itemName").value = "";
  document.getElementById("itemCategory").value = "";
  document.getElementById("itemLocation").value = "";
  document.getElementById("itemStock").value = "";
  document.getElementById("itemTotal").value = "";
  document.getElementById("itemEvent").value = "";

  renderInventory();
  showStatus("Inventory item added.");
}

function openCheckout(index) {
  selectedCheckoutIndex = index;

  const item = inventoryData[index];
  const checkoutPanel = document.getElementById("checkoutPanel");
  const checkoutItemName = document.getElementById("checkoutItemName");
  const checkoutQty = document.getElementById("checkoutQty");

  if (checkoutPanel && checkoutItemName && checkoutQty) {
    checkoutPanel.classList.remove("hidden");
    checkoutItemName.textContent = "Item: " + item.product;
    checkoutQty.value = "";
  }
}

function confirmCheckout() {
  if (selectedCheckoutIndex === null) {
    showStatus("Please select an item.");
    return;
  }

  const item = inventoryData[selectedCheckoutIndex];
  const qtyInput = document.getElementById("checkoutQty");
  const checkoutPanel = document.getElementById("checkoutPanel");
  const username = sessionStorage.getItem("username") || "Unknown User";

  if (!qtyInput || !checkoutPanel) return;

  const qty = Number(qtyInput.value);

  if (qtyInput.value.trim() === "" || isNaN(qty)) {
    showStatus("Quantity must be a number.");
    return;
  }

  if (!Number.isInteger(qty) || qty <= 0) {
    showStatus("Quantity must be a whole number greater than 0.");
    return;
  }

  if (qty > item.inStock) {
    showStatus("Quantity cannot exceed stock.");
    return;
  }

  item.inStock = item.inStock - qty;

  checkoutRecords.push({
    user: username,
    item: item.product,
    quantity: qty,
    action: "checkout",
    timestamp: new Date().toLocaleString()
  });

  localStorage.setItem("inventoryData", JSON.stringify(inventoryData));
  localStorage.setItem("checkoutRecords", JSON.stringify(checkoutRecords));

  checkoutPanel.classList.add("hidden");
  qtyInput.value = "";
  selectedCheckoutIndex = null;

  renderInventory();
  showStatus("Item successfully checked out.");
}

function openReturn(index) {
  selectedCheckoutIndex = index;

  const item = inventoryData[index];
  const returnPanel = document.getElementById("returnPanel");
  const returnItemName = document.getElementById("returnItemName");
  const returnQty = document.getElementById("returnQty");

  if (returnPanel && returnItemName && returnQty) {
    returnPanel.classList.remove("hidden");
    returnItemName.textContent = "Item: " + item.product;
    returnQty.value = "";
  }
}

function confirmReturn() {
  if (selectedCheckoutIndex === null) {
    showStatus("Please select an item.");
    return;
  }

  const item = inventoryData[selectedCheckoutIndex];
  const qtyInput = document.getElementById("returnQty");
  const returnPanel = document.getElementById("returnPanel");
  const username = sessionStorage.getItem("username") || "Unknown User";

  if (!qtyInput || !returnPanel) return;

  const qty = Number(qtyInput.value);

  if (qtyInput.value.trim() === "" || isNaN(qty)) {
    showStatus("Quantity must be a number.");
    return;
  }

  if (!Number.isInteger(qty) || qty <= 0) {
    showStatus("Quantity must be a whole number greater than 0.");
    return;
  }

  if (item.inStock + qty > item.total) {
    showStatus("Return quantity cannot exceed total stock.");
    return;
  }

  item.inStock = item.inStock + qty;

  checkoutRecords.push({
    user: username,
    item: item.product,
    quantity: qty,
    action: "return",
    timestamp: new Date().toLocaleString()
  });

  localStorage.setItem("inventoryData", JSON.stringify(inventoryData));
  localStorage.setItem("checkoutRecords", JSON.stringify(checkoutRecords));

  returnPanel.classList.add("hidden");
  qtyInput.value = "";
  selectedCheckoutIndex = null;

  renderInventory();
  showStatus("Item successfully returned.");
}

function showLowStockAlert(role) {
  const lowStockMessage = document.getElementById("lowStockMessage");
  if (!lowStockMessage) return;

  if (role !== "admin" && role !== "board") {
    lowStockMessage.textContent = "";
    return;
  }

  const lowItems = inventoryData.filter(item => item.inStock <= 1);

  if (lowItems.length > 0) {
    const names = lowItems.map(item => item.product).join(", ");
    lowStockMessage.textContent = "Low stock alert: " + names;
  } else {
    lowStockMessage.textContent = "";
  }
}

function editInventoryItem(index) {
  const item = inventoryData[index];

  const newProduct = prompt("Edit product name:", item.product);
  if (newProduct === null) return;

  const newCategory = prompt("Edit category name:", item.category);
  if (newCategory === null) return;

  const newLocation = prompt("Edit location name:", item.location);
  if (newLocation === null) return;

  const newInStock = prompt("Edit in stock quantity:", item.inStock);
  if (newInStock === null) return;

  const newTotal = prompt("Edit total quantity:", item.total);
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

  renderInventory();
  showStatus("Item updated.");
}

function deleteInventoryItem(index) {
  const confirmDelete = confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  inventoryData.splice(index, 1);
  localStorage.setItem("inventoryData", JSON.stringify(inventoryData));

  renderInventory();
  showStatus("Item deleted.");
}

renderInventory();