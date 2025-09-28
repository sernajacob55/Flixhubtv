const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Movie data
let movies = [
  {
    id: 1,
    title: "The Matrix",
    year: 1999,
    duration: "2h 16m",
    genre: "Sci-Fi",
    description:
      "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    cover: "/covers/matrix.jpg", // make sure this exists in frontend/covers/
    video:
      "https://download1351.mediafire.com/3yzrkgjjifhg-kBE2HT1i1X9UAOckBG5zokIOlih39t_HouFQji-qXpatH5FZw4-C20r5fD-Do-cJ7MyM7aRD8Uhz-BWQJcs5amcyCuEtcHjyhO0h9VWx1VfHxjIiSyiHJGpXfJ7VTnSDmR4Snc7RL0MH0eoZtOMVXw0Pr_Jfhb4N3Y/rks796idw5xqo2i/The+Matrix.mp4"
  }
];

// Endpoint to get all movies
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// Endpoint to get one movie by ID
app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id == req.params.id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});