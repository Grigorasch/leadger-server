/**
 * @typedef {Object} Payload
 * @property {string} iss - Издатель токена.
 * @property {string} sub - Идентификатор сокета пользователя.
 * @property {number} exp - Время истечения срока действия токена в миллисекундах.
 * @property {number} iat - Время выпуска токена в миллисекундах.
 */

/**
 * Генерирует полезную нагрузку JWT для запроса.
 * @param {Object} req - Объект запроса.
 * @returns {Payload} Полезная нагрузка JWT.
 */
function generatePayload(req) {
  return {
    iss: "grsch",
    sub: req.socket.id,
    exp: Date.now() + 60 * 60 * 1000,
    iat: Date.now(),
  };
};

module.exports = generatePayload;