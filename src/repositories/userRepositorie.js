const { User } = require("../models/user");

const userRepositorie = {
  async findOne(where) {
    return await User.findOne({ where: where });
  },

  async count(where) {
    return await User.count({ where });
  },

  async create(data) {
    return await User.create(data);
  },
};

module.exports = userRepositorie;
