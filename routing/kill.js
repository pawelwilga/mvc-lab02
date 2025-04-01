const logger = require('../utils/logger');

const killRputes = (req, res) => {
    logger.getProcessLog();
    process.exit();
};

module.exports = { killRputes };