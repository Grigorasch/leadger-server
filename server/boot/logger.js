const winston = require('winston');

/**
 * Объект логгера с методами для различных уровней логирования. По умолчанию,
 * логи раставлены везде где нужно, но никакую информацию не передают т.к.
 * представляют из себя пустую стрелочную функцию.
 * В ситуациях, когда нужно передавать какую-то информацию, функция логгера
 * заменяется на полноценный логгер.
 * @namespace logger
 */
const logger = {
    /**
     * Логгирование информационного сообщения
     * @function
     */
    info: () => {},
    /**
     * Логгирование предупреждающего сообщения
     * @function
     */
    warning: () => {},
    /**
     * Логгирование сообщения об ошибке
     * @function
     */
    error: () => {},
    /**
     * Логгирование отладочного сообщения
     * @function
     */
    debug: () => {}
};

/**
 * Создание логгера с указанным уровнем
 * @function
 * @param {string} level - Используемый уровень логирования
 * @returns {winston.Logger} Настроенный экземпляр логгера
 */
const createLogger = (level) => {
    return winston.createLogger({
        level: level,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} [${level.toUpperCase()}]: ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console()
        ]
    });
};

module.exports = {logger, createLogger};