/* =========================================================
   FlixHubTV Metadata Fetcher
   Auto-populates movie details using OMDb API
   ========================================================= */

(async function () {
  const API_KEY = "ea7569d7"; // ✅ Your OMDb API key
  const API_URL = "https://www.omdbapi.com/";

  const els = {
    title: document.getElementById("title"),
    year: document.getElementById("year"),
    duration: document.getElementById("duration"),
    genres: document.getElementById("genres"),
    description: document.getElementById("description"),
    actors: document.getElementById("actors"),
    director: document.getElementById("director"),
    rating: document.getElementById("rating"),
    poster: document.getElementById("poster"),
    castBlock: document.getElementById("castBlock"),
    crewBlock: document.getElementById("crewBlock"),
    playBtn: document.getElementById("playBtn"),
  };

  const qs = new URLSearchParams(location.search);
  const movieId = qs.get("id");

  const movieMap = {
    "1": "The Matrix",
    "2": "Inception",
    "3": "Interstellar"
  };

  const queryTitle = movieMap[movieId] || els.title?.textContent?.trim();
  if (!queryTitle) return;

  try {
    const url = `${API_URL}?t=${encodeURIComponent(queryTitle)}&apikey=${API_KEY}&plot=full`;
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.Response !== "False") {
      if (els.title) els.title.textContent = data.Title || queryTitle;
      if (els.year) els.year.textContent = `Year: ${data.Year || ""}`;
      if (els.duration) els.duration.textContent = `Duration: ${data.Runtime || ""}`;
      if (els.genres) els.genres.textContent = `Genres: ${data.Genre || ""}`;
      if (els.description) els.description.textContent = data.Plot || "";
      if (els.actors && data.Actors) {
        els.actors.textContent = data.Actors;
        els.castBlock.style.display = "block";
      }
      if (els.director && data.Director) {
        els.director.textContent = data.Director;
        els.crewBlock.style.display = "block";
      }
      if (els.rating && data.imdbRating) {
        els.rating.textContent = `IMDb: ${data.imdbRating}/10`;
        els.rating.style.display = "inline";
      }
      if (els.poster && data.Poster && data.Poster !== "N/A") {
        els.poster.src = data.Poster;
      }
    }
  } catch (err) {
    console.error("Metadata fetch failed:", err);
  }
})();