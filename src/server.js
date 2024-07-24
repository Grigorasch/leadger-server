require("dotenv").config();
const sequelize = require("./config/database");
const fs = require("fs");
const http = require("http");
const https = require("https");
const app = require("./config/app");

// Пути к сертификатам
const privateKey = fs.readFileSync(process.env.SSL_PRIVATE_KEY, "utf8");
const certificate = fs.readFileSync(process.env.SSL_CERTIFICATE, "utf8");
const ca = fs.readFileSync(process.env.CA, "utf8");
const credentials = { key: privateKey, cert: certificate, ca: ca };

// HTTPS сервер
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(process.env.HTTPS_PORT, process.env.SERVER_HOST, () => {
  console.log(`HTTPS server listening on host ${host} and port ${port}`);
});
// HTTP сервер для редиректов на HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
});
httpServer.listen(process.env.HTTP_PORT, host, () => {
  console.log(
    `HTTP server listening on host ${host} and port 80 for redirection`,
  );
});

// Обработка системных сигналов на завершение работы
process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down gracefully.");
  serverShutDown();
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down gracefully.");
  serverShutDown();
});

// Функция завершения работы сервера
async function serverShutDown() {
  httpsServer.close(() => {
    console.log("HTTPS server closed.");
    process.exit(0);
  });
  httpServer.close(() => {
    console.log("HTTP server closed.");
  });
  await sequelize.close();
  console.log("Server has been stoped");
}
