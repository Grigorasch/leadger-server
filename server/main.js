const argv = require("yargs").argv;
const { c, m } = argv;
const { loadConfig } = require("./boot/config");
let serverManager;

loadConfig(c, m).then((config) => {
  global.config = config;
  preloading();
});

function preloading() {
  // Создаем логгер
  if (global.config.log.enabled) {
    const { logger, createLogger } = require("./boot/logger");
    global.config.log.level.map((level) => {
      preparedLogger = createLogger(level);
      logger[level] = (message) => preparedLogger[level](message);
    });
    logger.info("Логирование включено");
  }

  // Запуск сервера если Автозапуск включен, иначе переход в режим ожидания
  serverManager = require("./control/server-manager");
  serverManager.state =
    serverManager.SERVER_STATES[global.config.autostart ? 2 : 3];
  console.log(serverManager.state);
}

// main()

// const { logger, createLogger } = require("./boot/logger");
// const serverManager = require("./control/server-manager");

// async function main() {
//   // Получаем параметры запуска
//   // Загружаем конфигурацию
//   global.config = await configer.loadConfig(config, manual);
//   // Создаем логгер
//   if (global.config.log.enabled) {
//     global.config.log.level.map((level) => {
//       preparedLogger = createLogger(level);
//       logger[level] = (message) => preparedLogger[level](message);
//     });
//     logger.info("Логирование включено");
//   }
//   serverManager.status = serverManager.SERVER_STATES[(global.config.autostart ? 2 : 3)];
// }
