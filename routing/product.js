const fileSystem = require("fs");
const { STATUS_CODE } = require("../constants/statusCode");
const path = require('path');
const express = require('express');
const logger = require('../utils/logger');
const rnpp = require('../views/renderNewProductPage');

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
router.get('/new', (req, res) => {
  fileSystem.readFile(
    path.join(__dirname, '../', 'product.txt'),
    'utf-8',
    (err, data) => {
      if (err) {
        res.status(STATUS_CODE.NOT_FOUND).send(rnpp(null));
      } else {
        const productData = JSON.parse(data);
        res.send(rnpp(productData));
      }
    }
  );
});
router.use((req, res) => {
  logger.getErrorLog(req.url);
  res.status(STATUS_CODE.NOT_FOUND).sendFile(path.join(__dirname, '../views', '404.html'));
});

module.exports = router;
