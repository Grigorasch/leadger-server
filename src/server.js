require("dotenv").config();
const sequelize = require("./config/database");
const credentials = require("./config/credentials");
const http = require("http");
const https = require("https");
const app = require("./config/app");

// HTTPS сервер
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(process.env.HTTPS_PORT, process.env.SERVER_HOST, () => {
  console.log(`HTTPS server listening on host and port`);
});
httpsServer.on('connection', socket => {
  socket.id = uuidv4();
});

// HTTP сервер для редиректов на HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
});
httpServer.listen(process.env.HTTP_PORT, process.env.SERVER_HOST, () => {
  console.log(
    `HTTP server listening on host and port 80 for redirection`,
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
