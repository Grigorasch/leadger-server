const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Конфигурация транспортера для отправки писем
const transporter = nodemailer.createTransport({
  host: 'mail.grigorasch.site', // Используем хост из MX записи
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'admin@grigorasch.site',
    pass: 'your-email-password', // Замените на ваш пароль
  },
});

// Маршрут для отправки письма
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'admin@grigorasch.site',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Ошибка при отправке письма' });
    }
    res.status(200).json({ message: 'Письмо отправлено: ' + info.response });
  });
});

// Запуск Express сервера
const host = 'grigorasch.site';
const port = 3000;
// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/www/index.html');
});
app.listen(port, host, () => {
  console.log(`SMTP сервер запущен на ${host}:${port}`);
  console.log(`Используйте http://${host}:${port}/send-email для отправки писем`);
});








// // /server/host/http.host.js

const http = require("http");

// HTTP сервер для редиректов на HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
});

// // /server/host/https.host.js

const https = require("https");
const fs = require("fs");
const app = require("./routes/app"); // Ваше Express приложение
const { logger } = require("../boot/logger");

// // Загрузка конфигурации
// logger.info(global.config);

const privateKey = fs.readFileSync(global.config.ssl.privateKey, "utf8");
const certificate = fs.readFileSync(global.config.ssl.certificate, "utf8");
const ca = fs.readFileSync(global.config.ssl.ca, "utf8");

const credentials = { key: privateKey, cert: certificate, ca: ca };

// // HTTPS сервер
const httpsServer = https.createServer(credentials, app);



async function main() {
  // Загрузка конфигурации
  global.config = await configer.loadConfig();

  // Логирование
  if (global.config.log.enabled) {
    global.config.log.level.forEach((level) => {
      const preparedLogger = createLogger(level);
      logger[level] = (message) => preparedLogger[level](message);
    });
    logger.info("Логирование включено");
  }

  // Запуск HTTPS сервера
  const httpsPort = global.config.httpsPort;
  httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS сервер запущен на порту ${httpsPort}`);
  });

  // Запуск HTTP сервера
  const httpPort = global.config.httpPort;
  httpServer.listen(httpPort, () => {
    console.log(`HTTP сервер запущен на порту ${httpPort}`);
  });
}

// main().catch((err) => {
//   console.error("Ошибка при запуске серверов", err);
// });

