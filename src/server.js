require('dotenv').config();
const fs = require('fs');
const http = require('http');
const https = require('https');
const app = require("./app");

const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

// Пути к сертификатам
const privateKey = fs.readFileSync('/etc/letsencrypt/live/grigorasch.site/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/grigorasch.site/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/grigorasch.site/chain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };

// HTTPS сервер
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, host, () => {
  console.log(`HTTPS server listening on host ${host} and port ${port}`);
});
// HTTP сервер для редиректов на HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
  res.end();
});
httpServer.listen(80, host, () => {
  console.log(`HTTP server listening on host ${host} and port 80 for redirection`);
});


