// 🏗 Structo the Builder
// Do wysłania pliku możesz wykorzystać, response.sendFile(path.join(__dirname, "../views", "home.html"));

const path = require('path');

const homeRouting = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, '../views', 'home.html'));
};

module.exports = { homeRouting };
