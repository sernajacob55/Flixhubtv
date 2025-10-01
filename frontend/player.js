document.addEventListener("DOMContentLoaded", () => { 
  const video = document.getElementById("movieVideo");
  const player = document.getElementById("videoPlayer");
  const closeBtn = document.getElementById("exitFullscreen");

  if (!video || !player) return;

  // Get imdbID from querystring or resumeRequest
  const urlParams = new URLSearchParams(window.location.search);
  let imdbID = urlParams.get("id");
  let currentMovieData = {};

  // ✅ Fallback: if no id in URL, use resumeRequest
  if (!imdbID) {
    try {
      const resumeReq = JSON.parse(localStorage.getItem("resumeRequest"));
      if (resumeReq && resumeReq.imdbID) {
        imdbID = resumeReq.imdbID;
      }
    } catch (e) {}
  }

  // ✅ Load currentMovieData (set by movie.html if present)
  try {
    const saved = JSON.parse(localStorage.getItem("currentMovieData"));
    if (saved && saved.imdbID === imdbID) {
      currentMovieData = saved;
    }
  } catch (e) {
    currentMovieData = {};
  }

  // ✅ Fallback if currentMovieData missing
  if (!currentMovieData.imdbID && imdbID) {
    currentMovieData = {
      imdbID,
      title: "Unknown",
      poster: "placeholder.jpg"
    };
  }

  // ✅ Fix: Only set video.src if empty
  if (imdbID && window.movieMap && window.movieMap[imdbID]) {
    if (!video.src || video.src === window.location.href) {
      video.src = window.movieMap[imdbID];
    }
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

  // ✅ Resume playback if possible
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
        video.currentTime = entry.time; // ✅ always seek to saved time
      }
    } catch (e) {}
  });

  // ✅ Save progress to continueWatching
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
      const payload = {
        imdbID,
        time: video.currentTime || 0,
        title: currentMovieData.title || "Unknown",
        poster: currentMovieData.poster || "placeholder.jpg"
      };
      // remove old entry if exists
      continued = continued.filter(m => m.imdbID !== imdbID);
      // add newest to front
      continued.unshift(payload);
    }

    // ✅ Cap at 10 items
    if (continued.length > 10) {
      continued = continued.slice(0, 10);
    }

    localStorage.setItem("continueWatching", JSON.stringify(continued));
    window.dispatchEvent(new Event("storage")); // ✅ trigger live update
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