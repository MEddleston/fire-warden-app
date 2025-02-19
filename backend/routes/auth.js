const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sql = require("mssql");
const dbConfig = require("../config/dbConfig");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; 

// Signup Route
router.post("/signup", async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword)
      .input("first_name", sql.NVarChar, first_name)
      .input("last_name", sql.NVarChar, last_name)
      .input("role", sql.NVarChar, role)
      .query(
        "INSERT INTO users (email, password, first_name, last_name, role) VALUES (@email, @password, @first_name, @last_name, @role)"
      );

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM users WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, role: user.role, first_name: user.first_name, last_name: user.last_name, staff_number: user.staff_number }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ email: user.email, role: user.role, first_name: user.first_name, last_name: user.last_name, staff_number: user.staff_number, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
