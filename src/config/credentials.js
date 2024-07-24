const fs = require("fs");

const privateKey = fs.readFileSync(process.env.SSL_PRIVATE_KEY, "utf8");
const certificate = fs.readFileSync(process.env.SSL_CERTIFICATE, "utf8");
const ca = fs.readFileSync(process.env.SSL_CA, "utf8");
const credentials = { key: privateKey, cert: certificate, ca: ca };

module.exports = credentials;