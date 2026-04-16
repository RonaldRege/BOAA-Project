// member.js instead of all the info being in the dashboard

let membersData = {
  board: ["John Smith", "Tom Bark"],
  active: ["Mike Jordan", "Luis Hank"],
  admin: ["Prof Jacobs"]
};

// members
function renderMembers(){
  const boardList = document.getElementById("boardMembersList");
  const activeList = document.getElementById("activeMembersList");
  const adminList = document.getElementById("adminMembersList");

  // if there is no list
  if (!boardList || !activeList || !adminList) return;


  // clears old list items 
  boardList.innerHTML = "";
  activeList.innerHTML = "";
  adminList.innerHTML = "";

  // add members
  membersData.board.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    boardList.appendChild(li);
  });

   membersData.active.forEach((name)=> {
    const li = document.createElement("li");
    li.textContent = name;
    activeList.appendChild(li);
  });

   membersData.admin.forEach((name)=>{
    const li = document.createElement("li");
    li.textContent = name;
    adminList.appendChild(li);
  });
}

function addMember() {
  const name = document.getElementById ("memberName").value.trim();
  const group = document.getElementById ("memberGroup").value.trim();
if (name === ""){
  showStatus("Please enter a member name.");
  return;
}

membersData[group].push(name);
document.getElementById("memberName").value = "";

renderMembers();
showStatus("Member added.");
}

renderMembers();