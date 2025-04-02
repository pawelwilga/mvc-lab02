const logger = require('../utils/logger');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    logger.getProcessLog();
    process.exit();
});

module.exports = router;