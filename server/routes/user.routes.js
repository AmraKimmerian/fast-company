const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");

router.patch("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // todo: userId === currentUserId
    if (userId) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        // true -  в updatedUser вернет новый user, обновленный в БД
        // false или не указано - в updatedUser придет старый user
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже" });
  }
});
router.get("/", async (req, res) => {
  try {
    const list = User.find();
    res.send(list); // .status(200) можно не указывать, он по умолчанию
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже" });
  }
});
module.exports = router;
