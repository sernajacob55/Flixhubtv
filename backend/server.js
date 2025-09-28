const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Define path to frontend folder
const frontendPath = path.join(__dirname, "../frontend");

// Serve static files (CSS, JS, images)
app.use(express.static(frontendPath));

// Explicit routes for your main pages
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(frontendPath, "login.html"));
});

app.get("/profiles", (req, res) => {
  res.sendFile(path.join(frontendPath, "profiles.html"));
});

app.get("/movie", (req, res) => {
  res.sendFile(path.join(frontendPath, "movie.html"));
});

// Catch-all fallback (for safety)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ FlixHubTV backend running on port ${PORT}`);
});