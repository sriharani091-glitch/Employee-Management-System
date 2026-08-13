const express = require("express");
const router = express.Router();
const db = require("../db");

// GET ALL EMPLOYEES

router.get("/", (req, res) => {
  const sql = "SELECT * FROM employees ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.log("GET ALL EMPLOYEES ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to get employees",
      });
    }

    res.json({
      success: true,
      employees: results,
    });
  });
});

// GET SINGLE EMPLOYEE

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM employees WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log("GET SINGLE EMPLOYEE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to get employee",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      employee: results[0],
    });
  });
});

// ADD EMPLOYEE

router.post("/", (req, res) => {
  const {
    employee_id,
    name,
    department,
    designation,
    project,
    type,
    status,
    image,
  } = req.body;
  
  // REQUIRED FIELDS
  
  if (
    !employee_id ||
    !name ||
    !department ||
    !designation ||
    !type ||
    !status
  ) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing",
    });
  }

  // EMPLOYEE ID VALIDATION
  
  const employeeIdString = String(employee_id).trim();

  if (!/^\d{3,9}$/.test(employeeIdString)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Employee ID",
    });
  }

  // INSERT QUERY
  
  const sql = `
    INSERT INTO employees
    (
      employee_id,
      name,
      department,
      designation,
      project,
      type,
      status,
      image
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      employeeIdString,
      name.trim(),
      department,
      designation,
      project || null,
      type,
      status,
      image || null,
    ],
    (err, result) => {
      if (err) {
        console.log("ADD EMPLOYEE MYSQL ERROR:", err);

        // Duplicate Employee ID
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            success: false,
            message: "Employee ID already exists",
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to add employee",
          error: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Employee added successfully",
        id: result.insertId,
      });
    }
  );
});

// UPDATE EMPLOYEE

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const {
    employee_id,
    name,
    department,
    designation,
    project,
    type,
    status,
    image,
  } = req.body;

  // REQUIRED FIELDS
  
  if (
    !employee_id ||
    !name ||
    !department ||
    !designation ||
    !type ||
    !status
  ) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing",
    });
  }
  const employeeIdString = String(employee_id).trim();

  if (!/^\d{3,9}$/.test(employeeIdString)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Employee ID",
    });
  }
  
  // UPDATE QUERY
  
  const sql = `
    UPDATE employees
    SET
      employee_id = ?,
      name = ?,
      department = ?,
      designation = ?,
      project = ?,
      type = ?,
      status = ?,
      image = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      employeeIdString,
      name.trim(),
      department,
      designation,
      project || null,
      type,
      status,
      image || null,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log("UPDATE EMPLOYEE MYSQL ERROR:", err);

        // Duplicate Employee ID
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            success: false,
            message: "Employee ID already exists",
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to update employee",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      res.json({
        success: true,
        message: "Employee updated successfully",
      });
    }
  );
});



// DELETE EMPLOYEE

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM employees WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("DELETE EMPLOYEE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete employee",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  });
});

// EXPORT ROUTER

module.exports = router;