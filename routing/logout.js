const path = require('path');

const logoutRouting = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, '../views', 'logout.html'));
};

module.exports = { logoutRouting };
