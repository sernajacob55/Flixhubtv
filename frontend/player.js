document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("video");
  const closeBtn = document.getElementById("closePlayer");

  // Force true fullscreen when playback starts
  video.addEventListener("play", () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  });

  // Close button exits fullscreen + pauses video
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      video.pause();
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      window.location.href = "index.html";
    });
  }
});