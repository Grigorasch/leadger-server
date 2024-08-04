const { DataTypes } = require("sequelize");
const sequelize = require("database");
const validator = require("validator");
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
      set(value) {
        this.setDataValue(
          "email",
          validator.normalizeEmail(validator.escape(value)),
        );
      },
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
    },
  },
  {
    tableName: "users",
    timestamps: false,
  },
);

const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  password_confirmation: Joi.string().valid(Joi.ref("password")).required(),

  name: Joi.string().min(1).max(30).required(),
  password_salt: Joi.string()
    .length(32)
    .regex(/^[0-9A-F]+$/i)
    .required(),
  password_hash: Joi.string()
    .length(64)
    .regex(/^[0-9A-F]+$/i)
    .required(),
});
module.exports = { User, UserSchema };
