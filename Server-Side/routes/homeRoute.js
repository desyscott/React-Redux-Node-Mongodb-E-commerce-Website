import express from "express";

const router = express.Router();

router.get("/user1", (req, res) => {
  res.json({
    userList: ["des", "desmond", "essuman", "alice"],
  });
});

export {router}
