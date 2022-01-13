const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found!");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const editData = req.body;
  const updates = Object.keys(editData);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update fields were given!" });
  }

  try {
    const user = await User.findByIdAndUpdate(_id, editData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = router;
