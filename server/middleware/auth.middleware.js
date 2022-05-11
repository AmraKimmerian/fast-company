const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // Bearer sdfsfsdfsdfsdfsdfsdfsdfsfdsdf
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = tokenService.validateAccess(token);

    req.user = data;
    console.log("Decoded", data); // Decoded { _id: '627a46934e6cc083dfeee662', iat: 1652243978, exp: 1652247578 }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
