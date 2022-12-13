const express = require("express");
const Users = require("./users.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let user = await Users.find();
  res.send(user);
});

app.get("/getProfile/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let user = await Users.findById(id);
    // console.log(user);
    if (!user) {
      res.send("User not found!");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/register", async (req, res) => {
  let { email } = req.body;
  try {
    let user = await Users.findOne({ email });
    if (user) {
      return res.status(404).send("User is Already Exists!");
    } else {
      await Users.create(req.body);
      return res.send("Registration Successful!");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email, password });
  if (!user) {
    return res.send("Invalid Credentials");
  }
  const username = user.username;
  const id = user._id;

  res.send({ message: "Login Success!", id, email, username });
});

app.post("/logout", (req, res) => {
  try {
    res.send("logout successfully");
  } catch (e) {
    res.status(500).send(e);
  }
});
app.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let user = await Users.findByIdAndDelete(id);
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = app;
