// members.js

let membersData = JSON.parse(localStorage.getItem("membersData")) || {
  board: ["John Smith", "Tom Bark"],
  active: ["Mike Jordan", "Luis Hank"],
  admin: ["Prof Jacobs"]
};

function renderMembers() {
  const boardList = document.getElementById("boardMembersList");
  const activeList = document.getElementById("activeMembersList");
  const adminList = document.getElementById("adminMembersList");

  if (!boardList || !activeList || !adminList) {
    return;
  }

  boardList.innerHTML = "";
  activeList.innerHTML = "";
  adminList.innerHTML = "";

  const role = sessionStorage.getItem("role") || "member";

  membersData.board.forEach(function (name, index) {
    const li = document.createElement("li");

    if (role === "admin" || role === "board") {
      li.innerHTML = name + ` <button onclick="deleteMember('board', ${index})">Delete</button>`;
    } else {
      li.textContent = name;
    }

    boardList.appendChild(li);
  });

  membersData.active.forEach(function (name, index) {
    const li = document.createElement("li");

    if (role === "admin" || role === "board") {
      li.innerHTML = name + ` <button onclick="deleteMember('active', ${index})">Delete</button>`;
    } else {
      li.textContent = name;
    }

    activeList.appendChild(li);
  });

  membersData.admin.forEach(function (name, index) {
    const li = document.createElement("li");

    if (role === "admin" || role === "board") {
      li.innerHTML = name + ` <button onclick="deleteMember('admin', ${index})">Delete</button>`;
    } else {
      li.textContent = name;
    }
    adminList.appendChild(li);
  });
}

function addMember() {
  const role = sessionStorage.getItem("role") || "member";

  if (role !== "admin" && role !== "board") {
    showStatus("Only admin and board can add members.");
    return;
  }

  const name = document.getElementById("memberName").value.trim();
  const group = document.getElementById("memberGroup").value;

  if (name === "") {
    showStatus("Please enter a member name.");
    return;
  }

  // check for duplicates 
  if (
    membersData.board.includes(name) ||
    membersData.active.includes(name) ||
    membersData.admin.includes(name)
  ) {
    showStatus("That member already exists.");
    return;
  }

  membersData[group].push(name);
  localStorage.setItem("membersData", JSON.stringify(membersData));

  document.getElementById("memberName").value = "";

  renderMembers();
  showStatus("Member added.");
}

function deleteMember(group, index) {
  const role = sessionStorage.getItem("role") || "member";
  if (role !== "admin" && role !== "board") {
    showStatus("Only admin and board can delete members.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this member?");
  if (!confirmDelete) {
    return;
  }
  membersData[group].splice(index, 1);
  localStorage.setItem("membersData", JSON.stringify(membersData));
  renderMembers();
  showStatus("Member deleted.");
}

renderMembers();