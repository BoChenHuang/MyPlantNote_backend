import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { verifyToken } from "../service/utils";

const getUsers = async (req, res) => {
  const id = req.query.id;
  try {
    let users;
    if (id) users = await User.findById(id);
    else users = await User.find();
    if (users != null) res.status(200).json(users);
    else res.status(404).json({ message: `Can't find user by id: ${id}` });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) res.status(200).json(user);
    else res.status(404).json({ message: `Can't find user by id: ${id}` });
  } catch (err) {
    res.status(500).send(err);
  }
};

const createUser = async (req, res) => {
  const body = req.body;
  const userData = new User({
    name: body.name ? body.name : "user",
    email: body.email ? body.email : undefined,
    password: body.password ? bcrypt.hashSync(body.password, 10) : undefined,
  });

  try {
    const newUser = await userData.save();
    console.log(newUser);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateUser = async (req, res) => {
  const token = req.token;
  const data = {
    name: req.body.name? req.body.name : undefined,
    password: req.body.password? req.body.password : undefined,
    lastModifiedDate: Date.now()
  };

  try {
    const decodeed = await verifyToken(token);
    const userId = decodeed.payload.user_id;
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = (await User.find({ email: email })).pop();
    if (!user)
      res.status(404).json({ message: `Can't find user by email: ${email}` });
    else {
      const dbHashPwd = user.password;
      const compareResult = bcrypt.compareSync(password, dbHashPwd);
      if (compareResult) {
        const payload = {
          user_id: user.id,
          user_name: user.name,
          user_mail: user.email,
        };
        const token = jwt.sign(
          { payload: payload, exp: Math.floor(Date.now() / 1000) + 60 * 15 },
          config.secret
        ); // 15分鐘過期
        res.status(200).json({ message: "login success", token: token });
      } else res.status(200).json({ message: "wrong password" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export default { getUsers, createUser, getUserById, login, updateUser };
