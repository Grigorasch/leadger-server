const { EventEmitter } = require("node:events");
const readline = require("readline");
const {logger} = require("../boot/logger");
const Event = require("../events/event");
const httpsServer = require("../host/https.host.js");
const httpServer = require("../host/http.host.js");

class ServerManager extends EventEmitter {
  SERVER_STATES = {
    0: "stopped",
    1: "preloading",
    2: "starting",
    3: "waithing",
    4: "running",
    5: "stopping",
    6: "paussing",
    7: "exits",
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
    this.state = this.SERVER_STATES[1];
  }

  set state(state) {
    if (!Object.values(this.SERVER_STATES).includes(state))
      throw new logger.wraning(
        "Неверное состояние сервера. Запрошенное состояние " + state,
      );
    if (this._state === state)
      return logger.waring("Сервер уже в этом состоянии");
    this._state = state;
    this.emit(new Event(this._state, { target: this }));
  }

  get state() {
    return this._state;
  }

  emit(event) {
    logger.info(`Сервер перешел в состояние ${event.name}`);
    super.emit(event.name, event);
  }

  async connectDB() {
    if (this.db) {
      logger.warning("DB object allready exists");
      try {
        await this.db.authenticate();
        logger.warning("DB allready connected");
        return;
      } catch (error) {
        logger.warning("Connection defuses", error);
      }
    }
    const { name, user, password, host, port } = global.config.db;
    this.db = await new Sequelize(name, user, password, {
      host: host,
      port: port,
      dialect: "mysql",
    });
  }

  async httpsServerStart() {
    const { httpsPort, host } = global.config;
    httpsServer.listen(httpsPort, host, () => {
      logger.log(`HTTPS server listening on host and port`);
    });
    httpsServer.on("connection", (socket) => {
      socket.id = UUIDV4();
    });
  }

  async httpServerStart() {
    const { httpPort, host } = global.config;
    httpServer.listen(httpPort, host, () => {
      logger.log(`HTTP server listening on host and port 80 for redirection`);
    });
  }

  async start() {
    await this.connectDB();
    await this.httpsServerStart();
    await this.httpServerStart();
    this.state = this.SERVER_STATES[4];
  }

  async stop() {
    await new Promise((resolve, reject) => {
        httpServer.close(resolve);
    });
    await new Promise((resolve, reject) => {
        httpsServer.close(resolve);
    });
  }

  serverShutDown() {
    logger.log("Server is shutting down...");
    // Add logic to gracefully shut down the server
  }
}

const serverManager = new ServerManager();
serverManager.on(serverManager.SERVER_STATES[2], () => {
  serverManager.start();
});

serverManager.on(serverManager.SERVER_STATES[5], () => {
  serverManager.stop();
});

module.exports = serverManager;
