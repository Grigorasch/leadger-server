const { User } = require("../models/user");

const userRepositorie = {
  async findOne(where) {
    return await User.findOne({ where: where });
  },

  async count(where) {
    return await User.count({ where });
  },

  async create(model) {
    return await model.save();
  },
};

module.exports = userRepositorie;
