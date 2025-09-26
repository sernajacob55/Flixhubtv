const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve frontend
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Your Dropbox scl/fi link
const dropboxLink = "https://www.dropbox.com/scl/fi/b9m39omdl7mtrnzg0yq24/The-Matrix.mp4?rlkey=4xfnp6hxt8lggvw2uxgp0oyuk&st=111s85s9&dl=0";

// Movies array
let movies = [
  {
    title: "The Matrix",
    cover: "/covers/matrix.jpg",
    url: null // will be filled in after unwrapping
  }
];

// Function to unwrap Dropbox link
async function unwrapDropbox(link) {
  try {
    const res = await fetch(link, { redirect: "follow" });
    return res.url; // final redirected URL
  } catch (err) {
    console.error("Failed to unwrap Dropbox link:", err);
    return null;
  }
}

// API for movies
app.get("/api/movies", async (req, res) => {
  if (!movies[0].url) {
    const realUrl = await unwrapDropbox(dropboxLink);
    movies[0].url = realUrl;
  }
  res.json(movies);
});

// Fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FlixHubTV running at http://localhost:${PORT}`);
});