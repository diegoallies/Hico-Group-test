const express = require("express");
const router = express.Router();
const { createDB } = require("../controllers/payrollController");

//routes
router.get("/create/database", createDB);

module.exports = router;
