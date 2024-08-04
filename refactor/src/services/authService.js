const UserExistError = require("../errors/UserExistError");
const { User, UserSchema } = require("../models/user");
const userRepositorie = require("../repositories/userRepositorie");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

