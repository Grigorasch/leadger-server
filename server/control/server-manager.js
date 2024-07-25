const { EventEmitter } = require("node:events");
const configer = require("../boot/configer");
const readline = require("readline");
const logger = require("../boot/logger");

class ServerManager extends EventEmitter {
  SERVER_STATES = {
    0: "stopped",
    1: "preloading",
    2: "starting",
    3: "waithing",
    4: "running",
    5: "stopping",
    6: "paussing",
  };

  constructor() {
    super();
    if (ServerManager.instance) {
      return ServerManager.instance;
    }
    ServerManager.instance = this;
    this.state = this.SERVER_STATES[0];
    // this.checker = setInterval(() => {}, 30000);
}

  async prepare(argv) {
    // Получаем параметры запуска
    const { config, manual } = argv;
    global.config = await configer.loadConfig(config, manual);
console.log('!!!!!!!!!!!!!!!!!!!!!')
    // Подключаем логгирование при необходимости
    if (global.config.log.enable) this._loggerConfig();
    console.log('!!!!!!!!!!!!!!!!!!!!!')

    // Подключаем командную строку
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    logger.info('Введите "start" для запуска сервера, "stop" для остановки сер');
  }

  _loggerConfig() {
    const winLogger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: global.config.log.file }),
      ],
    });
    console.log(winLogger)
    global.config.log.level.forEach(
      (level) => (logger[level] = winLogger[level])
    );
  }
}

const serverManager = new ServerManager();

module.exports = serverManager;
