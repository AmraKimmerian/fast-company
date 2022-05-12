const express = require("express");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

// /api/commen
router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      // orderBy - имя поля
      // equalTo - значение
      const { orderBy, equalTo } = req.query;
      const list = await Comment.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      console.log("error", error.message);
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже" });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newComment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже" });
    }
  });

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    // const removedComment = await Comment.find({ _id: commentId });
    const removedComment = await Comment.findById(commentId);
    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже" });
  }
});

module.exports = router;
