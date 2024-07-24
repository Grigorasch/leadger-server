const User = require("../models/user");

const userRepositorie = {
  async findOne(where) {
    return await User.findOne({where: where});
  }
}

module.exports = userRepositorie;