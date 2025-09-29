document.addEventListener("DOMContentLoaded", () => {
    /* ===============================
       SIDEBAR TOGGLE
    =============================== */
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".sidebar-toggle");

    if (sidebar && sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            document.body.classList.toggle("sidebar-open");
        });
    }

    // Close sidebar if clicked outside
    document.addEventListener("click", (e) => {
        if (sidebar && sidebarToggle) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove("open");
                document.body.classList.remove("sidebar-open");
            }
        }
    });

    /* ===============================
       VIDEO PLAYER FULLSCREEN
    =============================== */
    const videoPlayer = document.getElementById("videoPlayer");
    const playerContainer = document.getElementById("playerContainer");
    const closeBtn = document.getElementById("closeBtn");

    if (videoPlayer && playerContainer && closeBtn) {
        // Close player
        closeBtn.addEventListener("click", () => {
            videoPlayer.pause();
            playerContainer.style.display = "none";

            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        });

        // Auto fullscreen on play
        videoPlayer.addEventListener("play", () => {
            if (!document.fullscreenElement) {
                playerContainer.requestFullscreen().catch(err => {
                    console.warn("Fullscreen request failed:", err);
                });
            }
        });
    }

    /* ===============================
       WATCHLIST BUTTON
    =============================== */
    const watchlistBtn = document.getElementById("watchlistBtn");

    if (watchlistBtn) {
        watchlistBtn.addEventListener("click", () => {
            if (watchlistBtn.classList.contains("added")) {
                watchlistBtn.textContent = "+ Add to Watchlist";
                watchlistBtn.classList.remove("added");
            } else {
                watchlistBtn.textContent = "✓ Added to Watchlist";
                watchlistBtn.classList.add("added");
            }
        });
    }
});