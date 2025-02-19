const express = require("express");
const sql = require("mssql");
const dbConfig = require("../config/dbConfig");

const router = express.Router();

// Warden logs location
router.post("/fire-wardens", async (req, res) => {
  const { staff_number, first_name, last_name, location } = req.body;

  try {
    console.log("hi")
    console.log(staff_number, first_name, last_name, location)
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("staff_number", sql.Int, staff_number)
      .input("first_name", sql.NVarChar, first_name)
      .input("last_name", sql.NVarChar, last_name)
      .input("location", sql.NVarChar, location)
      .query(
        "INSERT INTO fire_wardens (staff_number, first_name, last_name, location, entry_time) VALUES (@staff_number, @first_name, @last_name, @location, GETDATE())"
      );

    res.json({ message: "Location logged successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Warden's Entries
router.get("/fire-wardens/:email", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("email", sql.NVarChar, req.params.email)
      .query("SELECT * FROM fire_wardens WHERE email = @email ORDER BY entry_time DESC");

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin View 
router.get("/fire-wardens", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query(
        `SELECT * FROM fire_wardens 
         WHERE DATEDIFF(HOUR, entry_time, GETDATE()) <= 24`
      );

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
