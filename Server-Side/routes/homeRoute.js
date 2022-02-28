const express = require("express");

const router = express.Router;

router.get("/user1", (req, res) => {
  res.json({
    userList: ["des", "desmond", "essuman", "alice"],
  });
});

module.exports = router;
