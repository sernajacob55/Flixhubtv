const modal = document.getElementById("playerModal");
const video = document.getElementById("videoPlayer");
const playBtn = document.getElementById("playBtn");

const playPause = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");
const volumeBar = document.getElementById("volumeBar");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const closeBtn = document.getElementById("closeBtn");
const controls = document.querySelector(".video-controls");

let hideControlsTimeout;

// Open modal + autoplay
playBtn.addEventListener("click", () => {
  modal.classList.add("open");
  video.play();
  updatePlayIcon();
  resetControlsTimer();
});

// Play/pause toggle
playPause.addEventListener("click", () => {
  if (video.paused) video.play();
  else video.pause();
  updatePlayIcon();
  resetControlsTimer();
});

function updatePlayIcon() {
  playPause.textContent = video.paused ? "▶" : "⏸";
}

// Time update
video.addEventListener("timeupdate", () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.value = percent;
  currentTimeEl.textContent = formatTime(video.currentTime);
  durationTimeEl.textContent = formatTime(video.duration);
});

// Seek
progressBar.addEventListener("input", () => {
  video.currentTime = (progressBar.value / 100) * video.duration;
  resetControlsTimer();
});

// Volume
volumeBar.addEventListener("input", () => {
  video.volume = volumeBar.value;
  resetControlsTimer();
});

// Fullscreen
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    modal.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  resetControlsTimer();
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.remove("open");
  video.pause();
});

// Format time
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/* ---------- Auto-hide controls + cursor ---------- */
function resetControlsTimer() {
  controls.classList.remove("hidden");
  modal.classList.remove("hide-cursor");
  clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(() => {
    if (!video.paused) {
      controls.classList.add("hidden");
      modal.classList.add("hide-cursor");
    }
  }, 3000); // hide after 3s
}

// Show controls on mouse move or tap
modal.addEventListener("mousemove", resetControlsTimer);
modal.addEventListener("click", resetControlsTimer);