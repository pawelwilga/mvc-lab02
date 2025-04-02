const fileSystem = require("fs");
const { STATUS_CODE } = require("../constants/statusCode");
const path = require('path');
const express = require('express');
const logger = require('../utils/logger');

const router = express.Router();

router.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'add-product.html'));
});

router.post('/add', (req, res) => {
  const formData = { name: name, description: description } = req.body;
  console.log(formData);
  fileSystem.writeFile(
    path.join(__dirname, '../', 'product.txt'),
    JSON.stringify(formData, null, 2),
    (err) => {
      res.statusCode = STATUS_CODE.FOUND;
      res.redirect("/product/new");
    }
  );
});
router.use((req, res) => {
  logger.getErrorLog(req.url);
  res.status(STATUS_CODE.NOT_FOUND).sendFile(path.join(__dirname, '../views', '404.html'));
});

const productRouting = (request, response) => {
  const { url, method } = request;

  if (url.includes("add") && method === "POST") {
    return addNewProduct(request, response);
  }

  if (url.includes("new")) {
    return renderNewProductPage(response);
  }

  console.warn(`ERROR: requested url ${url} doesn't exist.`);
  return;
};

const renderNewProductPage = (response) => {
  fileSystem.readFile("./product.txt", "utf-8", (err, data) => {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Shop - Newest product</title></head>");
    response.write("<body>");
    response.write("<h1>Newest product</h1>");
    response.write(
      "<nav><a href='/'>Home</a><br /><a href='/product/add'>Add product</a><br /><a href='/logout'>Logout</a></nav>"
    );

    if (err) {
      response.write("<br /><div>No new products available.</div>");
    } else {
      response.write(`<br /><div>New product data - ${splittedData}</div>`);
    }

    response.write("</body>");
    response.write("</html>");
  });
};

module.exports = router;
