const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve everything inside /frontend as static files (images, index.html, etc.)
app.use(express.static(path.join(__dirname, "..", "frontend")));

// ---- MOVIE LIST (edit this later to add more) ----
// Tip: avoid spaces in cover filenames; use lowercase like "matrix.jpg".
const movies = [
  {
    title: "The Matrix",
    cover: "/covers/matrix.jpg",
    url: "https://dl.dropboxusercontent.com/scl/fi/b9m39omdl7mtrnzg0yq24/The-Matrix.mp4"
  }
];

// API to get movies
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// Fallback to index.html (Express v5 compatible)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FlixHubTV running at http://localhost:${PORT}`);
});