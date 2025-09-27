const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve frontend
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Categories
const categories = [
  {
    name: "Sci-Fi",
    movies: [
      {
        title: "The Matrix",
        cover: "/covers/matrix.jpg",
        url: "https://download1351.mediafire.com/.../The+Matrix.mp4"
      }
    ]
  },
  {
    name: "Action",
    movies: [] // empty for now
  },
  {
    name: "Drama",
    movies: [] // empty for now
  }
];

// API endpoint
app.get("/api/movies", (req, res) => {
  res.json(categories);
});

// Fallback to frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FlixHubTV running at http://localhost:${PORT}`);
});