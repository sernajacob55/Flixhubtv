# 📺 FlixHubTV

A Plex/Netflix-style movie streaming interface built with **HTML, CSS, and JavaScript**.  
Supports **user profiles, watchlist, full-screen video player, cast details, and recommendations**.

---

## ✨ Features
- 🔑 Login & Profiles — choose your profile and manage watchlist per user  
- 🎬 Dynamic Movies — posters, descriptions, genres, runtime pulled from OMDb API  
- ⭐ Cast Section — actor photos and names pulled from TMDb API  
- 🎯 Recommendations — suggested movies via TMDb recommendations endpoint  
- 📂 Sidebar — autohide sidebar with genre filters  
- 📝 Watchlist — add/remove movies (stored in localStorage)  
- ▶ Video Player — plays your MediaFire-hosted MP4s in full true fullscreen  
- 🎨 Style — Netflix-inspired dark gradient theme with neon cyan scrub bar  

---

## 🔑 API Keys
- OMDb → `ea7569d7` (for title, poster, runtime, genre, plot)  
- TMDb → `a2942c822ee97bc0df2dba1a65cf2d0f` (for cast photos & recommendations)  

Keys are already hardcoded in `index.html` and `movie.html`.

---

## 🚀 Usage
1. Clone the repo and install dependencies:  
   $ git clone <your-repo-url>  
   $ cd FlixHubTV  
   $ npm install  

2. Start the server:  
   $ npm start  

3. Open in browser:  
   http://localhost:5000  

---

## 📂 File Structure
FlixHubTV/  
├── index.html          # Home page (movie list + search)  
├── movie.html          # Movie details page (metadata, cast, recommendations)  
├── login.html          # Login screen  
├── profiles.html       # Profile selection  
├── player.js           # Handles sidebar, video player, watchlist  
├── style.css           # Full site styling (Netflix/Plex inspired)  
├── server.js           # Node.js backend  
├── package.json        # Project config  
├── README.md           # Documentation  
└── .gitignore  

---

## 🎥 Notes
- Movies are streamed from MediaFire MP4 links configured inside `player.js`  
- Metadata (poster, runtime, plot, genre) is pulled from OMDb  
- Actor photos and recommended movies are pulled from TMDb  