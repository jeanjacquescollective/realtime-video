navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    const video = document.createElement("video");
    video.srcObject = stream;
    video.autoplay = true;

    const localVideoDiv = document.querySelector(".local-video");
    localVideoDiv.appendChild(video);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    setInterval(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        
        const data = canvas.toDataURL("image/webp");
        socket.emit("video", { data, username: currentUsername });
    }, 100);


});

socket.on("video", ({ data, username }) => {
    const img = document.querySelector(`img[data-username="${username}"]`);
    if(!img){
        const newImg = document.createElement("img");
        newImg.src = data;
        newImg.setAttribute("data-username", username);
        const remoteVideoDiv = document.querySelector(".remote-videos");
        remoteVideoDiv.appendChild(newImg);
        return;
    }
    img.src = data;
});