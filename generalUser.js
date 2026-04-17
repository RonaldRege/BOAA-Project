function checkOut(studentID, itemName) {
    let permit = checkPermission();
    if (permit) {
        requestOut();
        newQuantity = availableQty - itemOut;

        recordCheckOut();
    }
    else {
        // Print message saying you do not have admin permission
        showStatus("Admin permission is needed to checkout this item.");
    }
}

function requestOut(availableQty) {
    itemOut = prompt("How many would you like to check out?");
    //itemOut = 1; // Currently set to check out 1 item at a time, modify to check out multiple (check for +, whole number, and <= available)
    if (itemOut < 0) {
        showStatus("Value must be positive.");
    } else if (itemOut > availableQty) {
        showStatus("Value cannot be more than what is available.");
    } else if (!itemOut.isInteger) {
        showStatus("Must be whole number.");
    }
    else {
        return itemOut;
    }
}

function checkPermission(studentID, itemName) {
    return true; // temporarily gives everyone permission
}

function returnItem(studentID, itemName) {
    // for minimum viable product, it would likely be easier to make it so that you must return all items of a specific type at once
}

function recordCheckOut(studentID, itemName, itemOut) {
    // record and store student ID, item name, and quantity of item checked out
    showStatus("The item was successfully checked out.");
}  