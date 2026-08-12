import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee } from "../api/employeeApi";

function ArrowLeft() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ViewEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);

      const response = await getEmployee(id);

      if (response.data.success) {
        setEmployee(response.data.employee);
      }
    } catch (error) {
      console.error("Failed to get employee:", error);
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="no-data">Loading employee...</div>;
  }

  if (!employee) {
    return <div className="no-data">Employee not found</div>;
  }

  return (
    <div className="details-page">
      <div className="details-title">
        <button
          className="back-button"
          onClick={() => navigate("/employee")}
        >
          <ArrowLeft />
        </button>

        <h1>View Employee Details</h1>
      </div>

      <div className="personal-tab">
        <span>👤</span>
        <span>Personal Information</span>
      </div>

      <div className="view-content">
        <div className="view-image">
          {employee.image ? (
            <img
              src={employee.image}
              alt={employee.name}
            />
          ) : (
            <div className="large-placeholder">
              {employee.name?.charAt(0)}
            </div>
          )}
        </div>

        <div className="view-grid">

          <div className="view-item">
            <label>Name</label>
            <p>{employee.name}</p>
          </div>

          <div className="view-item">
            <label>Employee ID</label>
            <p>{employee.employee_id}</p>
          </div>

          <div className="view-item">
            <label>Department</label>
            <p>{employee.department}</p>
          </div>

          <div className="view-item">
            <label>Designation</label>
            <p>{employee.designation}</p>
          </div>

          <div className="view-item">
            <label>Project</label>
            <p>{employee.project || "-"}</p>
          </div>

          <div className="view-item">
            <label>Type</label>
            <p>{employee.type}</p>
          </div>

          <div className="view-item">
            <label>Status</label>
            <p>{employee.status}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewEmployee;