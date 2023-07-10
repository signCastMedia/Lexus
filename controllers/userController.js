const User = require("../models/User");

//Create User
async function create(req, res) {
  try {
    let token = await User.createUser(req);
    res.status(200).json(token);
  } catch (err) {
    res.status(400);
    res.json({ ERROR: err });
    console.log(err);
  }
}

//Create User
async function test(req, res) {
  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400);
    res.json({ ERROR: err });
    console.log(err);
  }
}

// LOGIN USER
async function login(req, res) {
  try {
    let token = await User.loginUser(req);
    res.status(200).json(token);


  } catch (err) {
    res.status(500);
    res.json("Invalid Credentials");
  }
}

//--------------------------------ADMIN USER REQUESTS--------------------------------//


// UPDATE USER
async function updateUser(req, res) {
  try {
    let data = await User.updateUser(req);
    res.status(200).json(data);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}


async function allUsers(req, res) {
  try {
    const data = await User.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}










module.exports = {
  create,
  login,
  updateUser,
  test,
  allUsers
};
