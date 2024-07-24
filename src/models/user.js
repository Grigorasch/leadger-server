const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const User = sequelize.define(
  "User",
  {
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
          validator.normalizeEmail(validator.escape(value))
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
    },
    password_salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
        is: /^[A-Za-zА-Яа-яЁё\d\-\s]+$/,
      },
    },
  },
  {
    hooks: {
      beforeValidate: async (user) => {
        if (!user.password_salt || !user.password_hash) {
          const salt = await bcrypt.genSalt(10);
          user.password_salt = salt;
          const hash = await bcrypt.hash(user.password, salt);
          user.password_hash = hash;
        }
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
    tableName: "users",
    timestamps: false,
  }
);

const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  password_confirmation: Joi.string().valid(Joi.ref("password")).required(),
  name: Joi.string().min(1).max(30).required(),
});

module.exports = { User, UserSchema };
