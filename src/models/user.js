const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    set(value) {
      this.setDataValue(
        "email",
        validator.normalizeEmail(validator.escape(value)),
      );
    },
  },
  password: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      len: [8, 30],
      notEmpty: true,
    },
  },
  password_confirmation: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      len: [8, 30],
      notEmpty: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 30],
      isAlpha: true,
    },
  },
  hooks: {
    beforeValidate: (user) => {
      if (user.password !== user.password_confirmation) {
        throw new Error("Passwords do not match");
      }
    },
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password_salt = salt;
      const hash = await bcrypt.hash(user.password, salt);
      user.password_hash = hash;
    },
    beforeUpdate: async (user) => {
      if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password_salt = salt;
        const hash = await bcrypt.hash(user.password, salt);
        user.password_hash = hash;
      }
    },
  },
});

module.exports = User;
