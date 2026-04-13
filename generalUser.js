public void checkOut(int userID, String itemName) {
    let permit = checkPermission();
    if (permit) {
        int itemOut = 1; // Currently set to check out 1 item at a time, modify to check out multiple (check for + and <= available)
        newQuantity = item.getQuantity() - itemOut;
        item.updateQuantity(newQuantity);

        recordCheckOut();
    }
    else {
    // Print message saying you do not have admin permission
    }
}

public void checkPermission(int userID, String itemName) {
    return true; // temporarily gives everyone permission
}

public void returnItem(int userID, String itemName) {
    // for minimum viable product, it would likely be easier to make it so that you must return all items of a specific type at once
}

public void recordCheckOut(int userID, String itemName, int itemOut) {
    // record and store student ID, item name, and quantity of item checked out
}  