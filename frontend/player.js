document.addEventListener("DOMContentLoaded", () => { 
  const video = document.getElementById("movieVideo");
  const player = document.getElementById("videoPlayer");
  const closeBtn = document.getElementById("exitFullscreen");

  if (!video || !player) return;

  // Get imdbID passed via query (for resume/continue features)
  const urlParams = new URLSearchParams(window.location.search);
  const imdbID = urlParams.get("id");
  let currentMovieData = {};

  // ✅ Load currentMovieData (set by movie.html)
  try {
    const saved = JSON.parse(localStorage.getItem("currentMovieData"));
    if (saved && saved.imdbID === imdbID) {
      currentMovieData = saved;
    }
  } catch (e) {
    currentMovieData = {};
  }

  // Helper: Enter fullscreen
  function enterFullscreen() {
    if (player.requestFullscreen) player.requestFullscreen();
    else if (player.webkitRequestFullscreen) player.webkitRequestFullscreen();
    else if (player.msRequestFullscreen) player.msRequestFullscreen();
  }

  // Helper: Exit fullscreen
  function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  }

  // Resume playback if possible
  video.addEventListener("loadedmetadata", () => {
    try {
      let resumeReq = JSON.parse(localStorage.getItem("resumeRequest"));
      if (resumeReq && resumeReq.imdbID === imdbID) {
        if (resumeReq.time > 0 && resumeReq.time < video.duration) {
          video.currentTime = resumeReq.time;
        }
        localStorage.removeItem("resumeRequest");
        return;
      }
      let continued = JSON.parse(localStorage.getItem("continueWatching")) || [];
      if (!Array.isArray(continued)) continued = [];
      const entry = continued.find(m => m.imdbID === imdbID && typeof m.time === "number");
      if (entry && entry.time > 0 && entry.time < video.duration) {
        video.currentTime = entry.time;
      }
    } catch (e) {}
  });

  // Save progress to continueWatching
  video.addEventListener("timeupdate", () => {
    if (!imdbID) return;
    let continued = [];
    try { continued = JSON.parse(localStorage.getItem("continueWatching")) || []; }
    catch (e) { continued = []; }
    if (!Array.isArray(continued)) continued = [];

    const remaining = (video.duration || 0) - (video.currentTime || 0);

    if (video.duration && remaining <= 600) {
      // ✅ Remove finished movies from continue watching
      continued = continued.filter(m => m.imdbID !== imdbID);
    } else {
      const i = continued.findIndex(m => m.imdbID === imdbID);
      const payload = {
        imdbID,
        time: video.currentTime || 0,
        title: currentMovieData.title || "Unknown",
        poster: currentMovieData.poster || "placeholder.jpg"
      };
      if (i >= 0) {
        continued.splice(i, 1); // remove old entry
      }
      continued.unshift(payload); // add to front (most recent first)
    }

    // ✅ Cap at 10 items (drop oldest)
    if (continued.length > 10) {
      continued = continued.slice(0, 10);
    }

    localStorage.setItem("continueWatching", JSON.stringify(continued));
  });

  // Force fullscreen when video starts
  video.addEventListener("play", () => {
    enterFullscreen();
  });

  // Close button exits fullscreen + pauses video
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      video.pause();
      video.src = "";
      player.style.display = "none";
      exitFullscreen();
      // ✅ Back to info page (details still visible)
    });
  }

  // Esc key also exits video
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (player.style.display === "flex") {
        video.pause();
        video.src = "";
        player.style.display = "none";
        exitFullscreen();
      }
    }
  });
});