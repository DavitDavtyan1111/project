import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 5;
  const skip = (page - 1) * perPage;
  try {
    const totalUsers = await User.countDocuments();

    const users = await User.find({}).skip(skip).limit(perPage);
    res.json({
      users,
      message: "Users sended",
      currentPage: page,
      totalPages: Math.ceil(totalUsers / perPage),
    });
  } catch (error) {
    console.log("bbbbbbbbbbb");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    // console.log("update", req.params);
    const id = req.params.id;
    const { updateFirstName, updateLastName } = req.body;
    const user = await User.findOne({ _id: id });

    user.firstName = updateFirstName;
    user.lastName = updateLastName;
    await user.save();
    res.json({ user, message: "User updated" });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { firstName, lastName, email, password } = req.body;
    const isUsed = await User.findOne({ email });
    if (isUsed) {
      return res.json({ message: "User already registered" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
    });

    await user.save();
    res.json({ user, message: "User saved successfully" });
  } catch (error) {
    res.json({ error, message: "User dont save" });
  }
};
