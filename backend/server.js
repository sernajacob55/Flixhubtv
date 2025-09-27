const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve frontend
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Movies array (only once!)
const movies = [
  {
    title: "The Matrix",
    cover: "/covers/matrix.jpg",
    url: "https://download1351.mediafire.com/3yzrkgjjifhg-kBE2HT1i1X9UAOckBG5zokIOlih39t_HouFQji-qXpatH5FZw4-C20r5fD-Do-cJ7MyM7aRD8Uhz-BWQJcs5amcyCuEtcHjyhO0h9VWx1VfHxjIiSyiHJGpXfJ7VTnSDmR4Snc7RL0MH0eoZtOMVXw0Pr_Jfhb4N3Y/rks796idw5xqo2i/The+Matrix.mp4"
  }
];

// API endpoint
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// Fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FlixHubTV running at http://localhost:${PORT}`);
});