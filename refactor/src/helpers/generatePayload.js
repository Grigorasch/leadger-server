module.exports = function generatePayload(req) {
  return {
    iss: "grsch",
    sub: req.socket.id,
    exp: Date.now() + 60 * 60 * 1000,
    iat: Date.now(),
  };
};
