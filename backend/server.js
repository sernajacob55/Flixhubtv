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
    // Replace FILE_ID with your Google Drive file id (see Step 10)
    url: "https://drive.google.com/uc?export=download&id=REPLACE_FILE_ID"
  }
];

// API to get movies
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// Fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FlixHubTV running at http://localhost:${PORT}`);
});