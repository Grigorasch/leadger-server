const https = require("https");
const app = require("./routes/app");
const fs = require("fs");
const {logger} = require("../boot/logger");
// Сертификаты
logger.info(global.config)
const privateKey = fs.readFileSync(global.config.ssl.privateKey, "utf8");
const certificate = fs.readFileSync(global.config.ssl.certificate, "utf8");
const credentials = { key: privateKey, cert: certificate};


// HTTPS сервер
const httpsServer = https.createServer(credentials, app);

module.exports = httpsServer;
