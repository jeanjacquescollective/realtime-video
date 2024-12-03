const socket = io();

const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

let currentUsername = uuid();
let currentUserId = uuid();
socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("newUser", { username: currentUsername });
});



socket.on("newUser", ({ username,userId }) => {    
        currentUsername = username;
    currentUserId = userId;
    // console.log(`New user connected: ${username}`);
    // if( userId === currentUserId ) {
    //     return;
    // }
    // currentUsername = username;
    // currentUserId = userId;
    // console.log(currentUserId);
    // const existingImage = document.querySelector(`img[data-userId="${userId}"]`);
    // if( existingImage ) {
    //     return;
    // }
    // createRemoteVideoStream({ data: "", username, userId });
});


socket.on("userDisconnected", ({ username, userId }) => {
    console.log(`User disconnected: ${username}`);
    const remoteVideoWrapper = document.querySelector(`[data-userId="${userId}"]`);
    if( remoteVideoWrapper ) {
        remoteVideoWrapper.remove();
    }
});


socket.on("usernameChanged", ({ username, userId }) => {
    console.log(`Username changed to ${username}`, userId);
    const remoteVideoWrapper = document.querySelector(`[data-userId="${userId}"]`);
    if(remoteVideoWrapper){
        const overlay = remoteVideoWrapper.querySelector(".username-overlay");
        if( !overlay ) {
            return;
        }
        overlay.textContent = username;
    }
});
