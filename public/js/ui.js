
// Function to change username
function changeUsername(newUsername) {
    socket.emit('usernameChanged', newUsername);
}

// Example usage
document.getElementById('change-username-button').addEventListener('click', () => {
    const newUsername = document.getElementById('username-input').value;
    changeUsername(newUsername);
});

function createRemoteVideoStream({ data, username, userId }) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("video-wrapper");

    const overlay = document.createElement("div");
    overlay.classList.add("username-overlay");
    overlay.textContent = username;

    const newImg = document.createElement("img");
    newImg.src = data;
    newImg.setAttribute("data-userId", userId);

    wrapper.appendChild(newImg);
    wrapper.appendChild(overlay);

    const remoteVideoDiv = document.querySelector(".remote-videos");
    remoteVideoDiv.appendChild(wrapper);

}