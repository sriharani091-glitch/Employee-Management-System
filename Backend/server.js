const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./db");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Employee Management Server is running");
});

app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "MySQL connection failed",
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "MySQL connected successfully",
    });
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});