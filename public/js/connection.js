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

socket.on("newUser", ({ username,userId }) => {    
    console.log(`New user connected: ${username}`);
    if( username === currentUsername ) {
        return;
    }
    const existingImage = document.querySelector(`img[data-username="${username}"]`);
    if( existingImage ) {
        return;
    }
    createRemoteVideoStream({ data: "", username, userId });
});


socket.on("userDisconnected", ({ username, userId }) => {
    console.log(`User disconnected: ${username}`);
    const img = document.querySelector(`img[data-userId="${userId}"]`);
    if( img ) {
        img.remove();
    }
});


socket.on("usernameChanged", ({ username, userId }) => {
    console.log(`Username changed to ${username}`, userId);

    const img = document.querySelector(`img[data-userId="${userId}"]`);
    console.log(img);
    if( img ) {
        const overlay = img.parentElement.querySelector(".username-overlay");
        if( !overlay ) {
            return;
        }
        overlay.textContent = username;
    }
});
