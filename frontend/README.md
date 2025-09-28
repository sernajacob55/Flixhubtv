\# FlixHubTV 🎬



A lightweight Plex/Netflix-style streaming interface built with HTML, CSS, and JavaScript.  

Supports fullscreen video playback and auto-pulls movie metadata (actors, director, rating, poster, plot) from the OMDb API.



---



\## 🚀 Features

\- Netflix/Plex-inspired \*\*UI with gradient background\*\*

\- \*\*Movie grid\*\* with search filtering

\- \*\*Fullscreen video modal\*\* (close button stays visible)

\- \*\*Auto metadata fetch\*\* via OMDb API (actors, director, plot, rating, poster)

\- Easy to extend: add new movies with just one line



---



\## 📂 Folder Structure

frontend/

├── index.html            # Main movie grid  

├── movie.html            # Individual movie detail/player page  

├── style.css             # Unified Netflix/Plex-inspired theme  

├── movie-metadata.js     # Metadata fetcher script  

└── assets/  

&nbsp;   └── posters/          # Local poster placeholders  



---



\## 🔑 Setup



1\. Clone the repository:

&nbsp;  git clone https://github.com/yourusername/flixhubtv.git  

&nbsp;  cd flixhubtv  



2\. Place your video files in `frontend/media/`.



3\. Get a free OMDb API key:

&nbsp;  - Go to http://www.omdbapi.com/apikey.aspx  

&nbsp;  - Sign up for the free plan  

&nbsp;  - Copy your API key  



4\. Add your API key into:

&nbsp;  - `frontend/movie-metadata.js`

&nbsp;  - `frontend/index.html`

&nbsp;  Example line:  

&nbsp;  const API\_KEY = "YOUR\_OMDB\_API\_KEY";



---



\## ➕ Adding New Movies

1\. Add your video file to `frontend/media/`.  

2\. Add a new entry in the `movies` array inside `index.html`:  

&nbsp;  const movies = \[  

&nbsp;    { id: "1", title: "The Matrix" },  

&nbsp;    { id: "2", title: "Inception" },  

&nbsp;    { id: "3", title: "Interstellar" },  

&nbsp;    { id: "4", title: "Your New Movie" }   // <--- add here  

&nbsp;  ];  



3\. That’s it! Posters + metadata will auto-pull from OMDb using the title.



---



\## 🖥️ Running

Just open `frontend/index.html` in your browser.  

No backend required (all client-side).



---



\## 📌 Notes

\- Free OMDb API has a 1,000 requests/day limit.  

\- If you need more, upgrade to a paid plan.  

\- Works best in Chrome/Firefox/Edge. Safari may need tweaks for fullscreen API.



---



\## 📜 License

MIT License – use and modify freely.

