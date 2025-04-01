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
})

app.use('/logout', lrs);
app.use('/kill', krs);
app.use('/home', hrs);

app.listen(config.PORT);

/*
  🏗 Structo the Builder  
  Zarejestruj middleware obsługujące poszczególne ścieżki.  
*/
/*
  🏗 Structo the Builder  
    Obsłuż stronę 404 – zwróć plik 404.html i zaloguj błąd.   
*/