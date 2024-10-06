import database from "../database/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function registerClient(req, res) {
  const insertClientSQL =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id";
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Password do not match" });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const resDb = await database.query(insertClientSQL, [
      username,
      email,
      hashedPassword,
    ]);
    const clientId = resDb.rows[0].id;
    const resData = {
      message: "Client registered successfully",
      data: {
        clientId: clientId,
        username: username,
        email: email,
      },
    };
    return res.status(201).json(resData);
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
}

async function loginClient(req, res) {
  const selectClientSQL = "SELECT * FROM users WHERE email = $1";
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const resDb = await database.query(selectClientSQL, [email]);
    if (resDb.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const client = resDb.rows[0];
    const dbPassword = client.password;

    const isPasswordMatch = bcrypt.compareSync(password, dbPassword);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET);

    const resData = {
      message: "Login successful",
      token: tokenm,
    };
    return res.status(200).json(resData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const authController = {
  registerClient,
  loginClient,
};

export default authController;
