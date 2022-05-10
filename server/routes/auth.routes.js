const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });

// /api/auth/signUp
// 1. get data from req (email, password...)
// 2. check if user already exists
// 3. hash password
// 4. create user
// 5. generate tokens
// Чтобы добавить мидлвэр-методы к хэндлеру, обернем его в массив и поместим туда эти методы
router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            // errors: errors.array(), // подробности ошибок в ответе
          },
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12); // salt 10 или 12

      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже" });
    }
  },
]);

// 1. validate
// 2. find user
// 3. compare hashed password
// 4. generate token
// 5. return data
router.post("/signInWithPassword", [
  check("email", "Email некорректный").normalizeEmail().isEmail(),
  check("password", "Пароль не может быть пустым").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID DATA",
            code: 400,
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).json({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже" });
    }
  },
]);

router.post("/token", async (req, res) => {
  // body
});

module.exports = router;
