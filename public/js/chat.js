// Get references to the input field and message wall
const input = document.getElementById("messageInput");
const wall = document.getElementById("messageWall");

// Function to send a message
function sendMessage() {
    const message = input.value; // Get the message from the input field
    socket.emit("message", {message, username: currentUsername}); // Send the message to the server
    input.value = ""; // Clear the input field
}

// Listen for incoming messages from the server
socket.on("message", ({message, username, userId}) => {
    const div = document.createElement("div"); // Create a new div element
    if (userId === currentUserId) {
        div.classList.add("local-message");
    } else {
        div.classList.add("remote-message");
    }
    div.setAttribute("data-username", username);
    div.textContent = message; // Set the text content of the div to the message
    wall.appendChild(div); // Append the div to the message wall
});