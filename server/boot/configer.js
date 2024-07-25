const fs = require('fs');

/**
 * @typedef {Object} Config
 * @property {number} port - Номер порта сервера.
 * @property {string} host - Имя хоста сервера.
 * @property {Object} db - Конфигурация базы данных.
 * @property {string} db.host - Имя хоста базы данных.
 * @property {number} db.port - Номер порта базы данных.
 * @property {string} db.name - Имя базы данных.
 * @property {string} db.user - Имя пользователя базы данных.
 * @property {string} db.password - Пароль пользователя базы данных.
 * @property {Object} ssl - Конфигурация SSL.
 * @property {string} ssl.privateKey - Путь к приватному ключу SSL.
 * @property {string} ssl.certificate - Путь к сертификату SSL.
 * @property {string} ssl.ca - Путь к цепочке сертификатов SSL.
 * @property {Object} jwt - Конфигурация JWT.
 * @property {string} jwt.alg - Алгоритм JWT.
 * @property {Object} jwt.secret - Конфигурация секрета JWT.
 * @property {string} jwt.secret.key - Ключ секрета JWT.
 * @property {string} jwt.secret.strt - Время начала действия секрета JWT.
 * @property {string} jwt.secret.exp - Время окончания действия секрета JWT.
 */

const defaultConfig = {
  port: 3000,
  host: "localhost",
  db: {
    host: "localhost",
    port: 20724,
    name: "",
    user: "",
    password: ""
  },
  ssl: {
    privateKey: "",
    certificate: "",
    ca: ""
  },
  jwt: {
    alg: "HS256",
    secret: {
      key: "",
      strt: "",
      exp: ""
    }
  }
};

/**
 * Объект `configer` для загрузки конфигурации.
 * @type {Object}
 * @property {Function} loadConfig - Загружает конфигурацию из файла и объединяет её с конфигурацией по умолчанию и ручными настройками.
 */
const configer = {
  /**
   * Загружает конфигурацию из указанного пути и объединяет её с конфигурацией по умолчанию и ручными настройками.
   * Если путь не указан, используется путь по умолчанию '../config.json'.
   * Ручные настройки конфигурации имеют приоритет над загруженными из файла.
   *
   * @param {string} [path='/config.json'] - Путь к файлу конфигурации.
   * @param {Object} [manualConfig={}] - Ручные настройки конфигурации.
   * @returns {Config} Объединённая конфигурация.
   */
  loadConfig(path = './config.json', manualConfig = {}) {
    const config = { ...defaultConfig };
    return new Promise((resolve) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error('Ошибка чтения файла конфигурации:', err);
        } else {
          try {
            Object.assign(config, JSON.parse(data));
          } catch (error) {
            console.error(`Ошибка парсинга JSON файла конфигурации: ${error.message}`);
          }
        }
        Object.assign(config, manualConfig);
        resolve(config);
      });
    });
  },
  
  /**
   * Сохраняет текущую конфигурацию в указанный файл.
   * Если путь не указан, используется путь по умолчанию './config.json'.
   * 
   * @param {string} [path='./config.json'] - Путь к файлу для сохранения конфигурации.
   * @param {Config} config - Конфигурация для сохранения.
   * @returns {Promise<void>} Промис, резолвящийся после завершения сохранения.
   */
  saveConfig() {}
};

module.exports = configer;