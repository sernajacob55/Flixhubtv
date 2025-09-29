document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  const videoContainer = document.getElementById("videoContainer");
  const videoElement = document.getElementById("videoElement");
  const closeBtn = document.getElementById("closeBtn");

  if (playButton) {
    playButton.addEventListener("click", () => {
      videoContainer.style.display = "flex";
      videoElement.play();

      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      videoElement.pause();
      videoContainer.style.display = "none";

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    });
  }
});