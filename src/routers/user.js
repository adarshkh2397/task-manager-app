const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send("User not found!");
//     }
//     res.send(user);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

//SIGNUP
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send({ Error: err.message });
  }
});

//LOGOUT
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.send(500).send();
  }
});

//LOGOUT FROM ALL SESSIONS
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.send(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
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
    // const user = await User.findById(_id);

    // if (!user) {
    //   return res.status(404).send();
    // }

    updates.forEach((update) => (req.user[update] = editData[update]));

    await req.user.save();
    //Can't run middleware using findByIdAndUpdate
    // const user = await User.findByIdAndUpdate(_id, editData, {
    //   new: true,
    //   runValidators: true,
    // });
    res.status(200).send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(_id);
    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = router;
