const express = require("express");
const router = express.Router({ mergeParams: true });

// /api/auth/signUp
router.post("/signUp", async (req, res) => {
  // body
});

router.post("/signInWithPassword", async (req, res) => {
  // body
});

router.post("/token", async (req, res) => {
  // body
});

module.exports = router;
