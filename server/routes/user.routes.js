const express = require("express");
const User = require("../models/User");
// Мидлвэр, защищающий от неавторизованности
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        // true -  в updatedUser вернет новый user, обновленный в БД
        // false или не указано - в updatedUser придет старый user
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже" });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();
    res.send(list); // .status(200) можно не указывать, он по умолчанию
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже" });
  }
});
module.exports = router;
