import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

// Register user
// POST api/users/signup
// Public
// register a user logic
export const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Auth user and get token
// POST api/users/login
// public

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      message: "Login successfully",
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or Password");
  }
});

// Get private profile
// GET api/users/profile
// Private
// get user private profile with isngle token

export const getUserProfile = asyncHandler(async (req, res) => {
  const { name, email, isAdmin } = req.user;
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name,
      email,
      isAdmin,
      //token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not Found");
  }
});

// Put private profile update
// PUT api/users/profile
// Private
// update user private profile with isngle token

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      //token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// get all user
// GET api/users
// Private / admin

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.json(users);
});

// GET user by ID
// GET /api/users/:id
// Private / admin

export const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// delete user
// DELETE /api/user/:id
// Private / admin

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// PUT user by ID
// PUT /api/user/:id
// private/ admin

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updateSingleUser = await user.save();

    res.json({
      _id: updateSingleUser._id,
      name: updateSingleUser.name,
      email: updateSingleUser.email,
      isAdmin: updateSingleUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
