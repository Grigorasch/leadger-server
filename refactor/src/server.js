
const sequelize = require("./config/database");


// Обработка системных сигналов на завершение работы

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
