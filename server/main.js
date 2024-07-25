const argv = require('./boot/argv');
const configer = require('./boot/configer');
const serverManager = require('./control/server-manager');

async function main() {
  // Получаем параметры запуска
  const { config, manual } = argv;
  global.config = await configer.loadConfig(config, manual);

  // Подключаем логгирование при необходимости
  if (global.config.log.enable) {
    const winLogger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: global.config.log.file }),
      ],
    });
    console.log(winLogger);
    global.config.log.level.forEach(
      (level) => (logger[level] = winLogger[level])
    );
  }
}

main();