const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");
class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("accessSecret"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get("refreshSecret"));
    return { accessToken, refreshToken, expiresIn: 3600 };
  }

  // user это id
  async save(user, refreshToken) {
    const data = await Token.findOne({ user });
    // Если запись есть, то ее нужно обновить
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    // Если записи нет - создаем ее
    const token = await Token.create({ user, refreshToken });
    return token;
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshSecret"));
    } catch (error) {
      return null;
    }
  }

  validateAccess(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("accessSecret"));
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
}
module.exports = new TokenService();
