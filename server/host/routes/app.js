const express = require('express')
const path = require('path');
const authRoute = require('./authentication');
const requestCounter = require('../../boot/request-counter');
const cookieParser = require('cookie-parser');

// Счётчик запросов
const app = express();
app.counter = requestCounter();

app.use((req, res, next) => {
  app.counter.addRequst();
  res.on('finish', () => {
    app.counter.removeRequest();
  });
  next();
});

// Парсинг данных
app.use(express.json());
app.use(cookieParser())

// Маршрут для авторизации
app.use('/auth', authRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});
// Обслуживание всех остальных маршрутов React приложения
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

module.exports = app;
