const express = require('express');
const { sql, poolPromise } = require('../database');
const router = express.Router();

// GET all fire wardens
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM fire_wardens");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new fire warden
router.post('/', async (req, res) => {
    const { staffNumber, firstName, lastName, location } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('staffNumber', sql.VarChar, staffNumber)
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('location', sql.VarChar, location)
            .query("INSERT INTO fire_wardens (staff_number, first_name, last_name, location) VALUES (@staffNumber, @firstName, @lastName, @location)");
        res.status(201).json({ message: "Fire warden registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a fire warden record
router.delete('/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query("DELETE FROM fire_wardens WHERE id = @id");
        res.json({ message: "Record deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;