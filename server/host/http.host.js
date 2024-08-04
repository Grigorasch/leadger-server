const http = require("http");

// HTTP сервер для редиректов на HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
});

module.exports = httpServer;