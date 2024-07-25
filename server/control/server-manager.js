const { EventEmitter } = require("node:events");
const configer = require("../boot/configer");
const readline = require("readline");
const logger = require("../boot/logger");
const Event = require("../events/event");

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

    // Подключаем командную строку
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    logger.info(
      'Введите "start" для запуска сервера, "stop" для остановки сер',
    );
    this.state = this.SERVER_STATES[1];
  }

  set state(state) {
    if (!Object.values(this.SERVER_STATES).includes(state))
      throw new Error(
        "Неверное состояние сервера. Запрошенное состояние " + state,
      );
    if (this._state === state)
      return logger.waring("Сервер уже в этом состоянии");
    this._state = state;
    this.emit(new Event("state", { target: this }));
  }

  emmit(event) {
    loggger.info(`Сервер перешел в состояние ${event.name}`);
    super.emmit(event.name, event);
  }
}

const serverManager = new ServerManager();

module.exports = serverManager;
