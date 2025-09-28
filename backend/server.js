const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Hardcoded login credentials
const USERS = {
  Streamme69420: "Xenomorph69420!"
};

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (USERS[username] && USERS[username] === password) {
    // ✅ Redirect to profiles page after successful login
    return res.redirect("/profiles.html");
  } else {
    // ✅ Reload login page with error flag
    return res.redirect("/login.html?error=1");
  }
});

// Default route (catch-all)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});