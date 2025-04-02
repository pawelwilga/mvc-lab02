const http = require("http");
const config = require("./config");
// const { requestRouting } = require("./routing/routing");
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const prs = require('./routing/product');
const lrs = require('./routing/logout');
const krs = require('./routing/kill');
const hrs = require('./routing/home');
const { STATUS_CODE } = require('./constants/statusCode');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', (req, res) => {
  const { url, method } = req;
  logger.getInfoLog(url, method);
  req.next();
});

app.use('/product', prs);
app.use('/logout', lrs);
app.use('/kill', krs);
app.use('/home', hrs);
app.use((req, res) => {
  logger.getErrorLog(req.url);
  res.status(STATUS_CODE.NOT_FOUND).sendFile(path.join(__dirname, './views', '404.html'));
});

app.listen(config.PORT);
