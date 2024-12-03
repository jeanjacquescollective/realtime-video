const socket = io();

const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const currentUsername = uuid();

socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("newUser", { username: currentUsername });
});

socket.on("newUser", ({ username }) => {    
    console.log(`New user connected: ${username}`);
    if( username === currentUsername ) {
        return;
    }
    const existingImage = document.querySelector(`img[data-username="${username}"]`);
    if( existingImage ) {
        return;
    }
    const img = document.createElement("img");
    img.setAttribute("data-username", username);
    const remoteVideoDiv = document.querySelector(".remote-videos");
    remoteVideoDiv.appendChild(img);
});


socket.on("userDisconnected", ({ username }) => {
    console.log(`User disconnected: ${username}`);
    const img = document.querySelector(`img[data-username="${username}"]`);
    if( img ) {
        img.remove();
    }
});