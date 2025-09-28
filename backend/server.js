<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FlixHubTV</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1 class="logo">FlixHubTV</h1>
    <div class="top-bar">
      <input type="text" id="searchBar" placeholder="Search movies or categories...">
      <button id="switchProfile">Switch</button>
      <button id="logout">Logout</button>
    </div>
    <div class="categories" id="categoriesBar">
      <!-- Categories will load dynamically -->
    </div>
  </header>

  <main>
    <section id="all-movies">
      <h2>All Movies</h2>
      <div class="movie-grid" id="movieGrid"></div>
    </section>
  </main>

  <script>
    let allMovies = [];

    async function fetchMovies() {
      const res = await fetch("/api/movies");
      const data = await res.json();
      allMovies = data;
      displayMovies(allMovies);
    }

    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const categories = await res.json();
      const categoriesBar = document.getElementById("categoriesBar");
      categoriesBar.innerHTML = "";

      categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => filterMovies(cat);
        categoriesBar.appendChild(btn);
      });
    }

    function displayMovies(movies) {
      const grid = document.getElementById("movieGrid");
      grid.innerHTML = "";
      movies.forEach(movie => {
        const tile = document.createElement("div");
        tile.classList.add("movie-tile");
        tile.innerHTML = `
          <img src="${movie.cover}" alt="${movie.title}">
          <p>${movie.title}</p>
        `;
        tile.onclick = () => {
          window.location.href = `movie.html?id=${movie.id}`;
        };
        grid.appendChild(tile);
      });
    }

    function filterMovies(category) {
      if (category === "All") {
        displayMovies(allMovies);
      } else {
        const filtered = allMovies.filter(movie => movie.genre.includes(category));
        displayMovies(filtered);
      }
    }

    document.getElementById("searchBar").addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query)
      );
      displayMovies(filtered);
    });

    fetchMovies();
    fetchCategories();
  </script>
</body>
</html>