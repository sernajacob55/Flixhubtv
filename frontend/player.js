const videoContainer = document.getElementById("video-container");
const moviePlayer = document.getElementById("moviePlayer");
const playBtn = document.getElementById("playBtn");
const closeBtn = document.getElementById("closeBtn");

let controlsVisible = true;
let hideControlsTimeout;

// Open video player
playBtn.addEventListener("click", () => {
  videoContainer.style.display = "flex";
  moviePlayer.play();

  // Force true fullscreen
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }

  resetControlsTimer();
});

// Close video player
closeBtn.addEventListener("click", () => {
  moviePlayer.pause();
  videoContainer.style.display = "none";

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// Auto-hide controls + cursor
function resetControlsTimer() {
  showControls();
  clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(() => {
    if (!moviePlayer.paused) {
      hideControls();
    }
  }, 3000);
}

function showControls() {
  controlsVisible = true;
  videoContainer.classList.remove("hide-cursor");
  if (moviePlayer.controls) {
    moviePlayer.setAttribute("controls", "true");
  }
}

function hideControls() {
  controlsVisible = false;
  videoContainer.classList.add("hide-cursor");
  moviePlayer.removeAttribute("controls");
}

// Mouse movement resets timer
videoContainer.addEventListener("mousemove", resetControlsTimer);
videoContainer.addEventListener("click", resetControlsTimer);

// Keep controls visible when paused
moviePlayer.addEventListener("pause", showControls);

// Sync progress bar (native controls styled via CSS)
moviePlayer.addEventListener("timeupdate", () => {
  // Nothing needed here since we’re using native styled controls
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (!videoContainer.style.display || videoContainer.style.display === "none") return;

  switch (e.key) {
    case " ":
      e.preventDefault();
      if (moviePlayer.paused) {
        moviePlayer.play();
      } else {
        moviePlayer.pause();
      }
      resetControlsTimer();
      break;
    case "Escape":
      moviePlayer.pause();
      videoContainer.style.display = "none";
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      break;
  }
});