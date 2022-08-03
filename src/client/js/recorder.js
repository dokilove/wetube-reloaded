const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 640, height: 480 },
  });
  video.srcObject = stream;
  video.play();
};

startBtn.addEventListener("click", handleStart);
