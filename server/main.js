const argv = require("yargs").argv;
const configer = require("./boot/configer");
const { logger, createLogger } = require("./boot/logger");
const serverManager = require("./control/server-manager");

async function main() {
  // Получаем параметры запуска
  const { config, manual } = argv;
  // Загружаем конфигурацию
  global.config = await configer.loadConfig(config, manual);
  // Создаем логгер
  if (global.config.log.enabled) {
    global.config.log.level.map((level) => {
      preparedLogger = createLogger(level);
      logger[level] = (message) => preparedLogger[level](message);
    });
    logger.info("Логирование включено");
  }
  serverManager.status = serverManager.SERVER_STATES[(global.config.autostart ? 2 : 3)];
}

main()