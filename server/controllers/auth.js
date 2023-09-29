import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const hashedPassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
      expiresIn: "1d",
    });
    if (!isPasswordCorrect) {
      return res.json({ message: "Wrong password" });
    }
    res.json({ token, user, message: "success" });
  } catch (error) {
    res.json({ error, message: "User dont login " });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
      expiresIn: "1d",
    });

    res.json({ user, token, message: "success" });
  } catch (error) {
    res.json({ error, message: "Can not get user page" });
  }
};
