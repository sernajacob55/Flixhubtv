const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve static files correctly from frontend folder at root
app.use(express.static(path.join(__dirname, "../frontend")));

// Root route -> Login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "login.html"));
});

// Profiles page
app.get("/profiles", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "profiles.html"));
});

// Index (main movie browser)
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Movie page
app.get("/movie", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "movie.html"));
});

// Player page
app.get("/player", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "player.html"));
});

// Watchlist & Continue Watching JSON
app.get("/movie-metadata", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "movie-metadata.json"));
});

// Catch-all fallback (404 handler for unknown routes)
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ FlixHubTV server running at http://localhost:${PORT}`);
});