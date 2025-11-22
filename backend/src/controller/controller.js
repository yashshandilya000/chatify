import { SendEmailWelcome } from "../emails/emailHandler.js";
import { genrateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

export const signup = async (req, res) => {
  const { Fullname, email, password } = req.body;
  try {
    if (!Fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(406)
        .json({ message: "password must be requested 6 chartactar" });
    }

    const EmailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!EmailRegx.test(email)) {
      return res.status(400).json({ message: "Invaild email Format" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email Already exist" });

    //12345 => $hbfiopf!@#$%^vbkj-p
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const NewUser = new User({
      Fullname,
      email,
      password: hashedPassword,
    });

    if (NewUser) {
      //before
      // genrateToken(NewUser._id, res);
      // await NewUser.save();

      //after
      //persist user first, then issue auth cookie
      const SavedUser = await NewUser.save();
      genrateToken(SavedUser._id, res);

      res.status(201).json({
        _id: NewUser._id,
        Fullname: NewUser.Fullname,
        email: NewUser.email,
        Profilepic: NewUser.Profilepic,
      });

      //send a welcome token to user

      try {
        await SendEmailWelcome(
          SavedUser.Fullname,
          SavedUser.email,
          process.env.CLIENT_URL
        );
      } catch (error) {
        console.error("Error sending welcome email in auth:", error);
      }
    } else {
      res.status(400).json({ message: "Invaild user data" });
    }
  } catch (error) {
    console.log("Error in signup Controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user, "users");
    if (!user) return res.status(400).json({ message: "invaild credentials" });
    //never tell the client which one is incorrect: password

    const IsPassword = await bcrypt.compare(password, user.password);
    if (!IsPassword)
      return res.status(400).json({ message: "Invaild Creadentials" });

    genrateToken(user._id, res);
    res.status(200).json({
      _id: user.id,
      Fullname: user.Fullname,
      email: user.email,
      Profilepic: user.Profilepic,
    });
  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({ message: "internal server error " });
  }
};

export const logout = (_, res) => {
  // res.send("Logout endpoint");
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};
