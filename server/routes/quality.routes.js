const express = require("express");
const Quality = require("../models/Quality");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    console.log("asdfasd");
    const list = await Quality.find();
    res.status(200).json(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже" });
  }
});

module.exports = router;
