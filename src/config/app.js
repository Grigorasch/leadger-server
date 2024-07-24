const express = require('express')
const path = require('path');
const app = express();
const authRoute = require('./routes/authentication');


app.use(express.json());

app.use('/auth', authRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
// Обслуживание всех остальных маршрутов React приложения
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
// app.listen(port, host, () => {
//   console.log(`Example app listening on host ${host} and port ${port}`)
// })