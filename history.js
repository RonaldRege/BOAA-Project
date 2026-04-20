// history log book thing 

function canViewHistory(){
    const role = sessionStorage.getItem("role")||"member";
    return role === "admin"||role ==="board";
}

function renderHistory(){
    const tableBody = document.getElementById("historyTableBody");
    if(!tableBody)
        return;

if(!canViewHistory()){
    window.location.href = "dashboard.html";
    return;
}
const historyData = JSON.parse(localStorage.getItem("checkoutRecords")) || [];
tableBody.innerHTML = "";

if(historyData.length === 0){
    const row = document.createElement("tr");
    row.innerhTML = `<td colspan="5">No history records yet.</td>`;
    tableBody.appendChild(row);
    return; 
}

historyData.forEach(function(record){
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${record.user}</td>
    <td>${record.item}</td>
    <td>${record.quantity}</td>
    <td>${record.action}</td>
    <td>${record.timestamp}</td>
    `;
    tableBody.appendChild(row);
});

}
renderHistory();