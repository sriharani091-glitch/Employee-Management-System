import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEmployees,
  deleteEmployee as deleteEmployeeApi,
} from "../api/employeeApi";

function EyeIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.7" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 14h10l1-14" />
      <path d="M9 7V4h6v3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function Employee() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET EMPLOYEES FROM MYSQL
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await getEmployees();

      if (response.data.success) {
        setEmployees(response.data.employees);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  // SEARCH
  const filteredEmployees = employees.filter((employee) => {
  const searchText = search.toLowerCase().trim();

  return (
    String(employee.name || "").toLowerCase().includes(searchText) ||
    String(employee.employee_id || "").toLowerCase().includes(searchText) ||
    String(employee.department || "").toLowerCase().includes(searchText) ||
    String(employee.designation || "").toLowerCase().includes(searchText) ||
    String(employee.project || "").toLowerCase().includes(searchText) ||
    String(employee.type || "").toLowerCase().includes(searchText) ||
    String(employee.status || "").toLowerCase().includes(searchText)
  );
});

  // DELETE
  const confirmDelete = async () => {
    if (!deleteEmployee) return;

    try {
      const response = await deleteEmployeeApi(deleteEmployee.id);

      if (response.data.success) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter(
            (employee) => employee.id !== deleteEmployee.id
          )
        );

        setDeleteEmployee(null);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="employee-page">
      <div className="page-heading">
        <h1>Employee</h1>

        <div className="employee-actions">
          <div className="search-box">
            <SearchIcon />

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="add-button"
            onClick={() => navigate("/employee/add")}
          >
            <PlusIcon />
            Add New Employee
          </button>
        </div>
      </div>

      <div className="employee-table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Project</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="no-data">
                  Loading employees...
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-name-cell">
                      {employee.image ? (
                        <img
                          src={employee.image}
                          alt={employee.name}
                          className="employee-small-image"
                        />
                      ) : (
                        <div className="employee-placeholder">
                          {employee.name?.charAt(0)}
                        </div>
                      )}

                      <span>{employee.name}</span>
                    </div>
                  </td>

                  <td>{employee.employee_id}</td>

                  <td>{employee.department}</td>

                  <td>{employee.designation}</td>

                  <td>{employee.project || "-"}</td>

                  <td>{employee.type}</td>

                  <td>
                    <span className="status-text">{employee.status}</span>
                  </td>

                  <td>
                    <div className="action-buttons">

                      {/* VIEW */}
                      <button
                        className="action-icon view-icon"
                        title="View"
                        onClick={() =>
                          navigate(`/employee/view/${employee.id}`)
                        }
                      >
                        <EyeIcon />
                      </button>

                      {/* EDIT */}
                      <button
                        className="action-icon edit-icon"
                        title="Edit"
                        onClick={() =>
                          navigate(`/employee/edit/${employee.id}`)
                        }
                      >
                        <PencilIcon />
                      </button>

                      {/* DELETE */}
                      <button
                        className="action-icon delete-icon"
                        title="Delete"
                        onClick={() => setDeleteEmployee(employee)}
                      >
                        <TrashIcon />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!loading && filteredEmployees.length === 0 && (
          <div className="no-data">No employees found</div>
        )}
      </div>

      {/* DELETE POPUP */}
      {deleteEmployee && (
        <div className="modal-overlay">
          <div className="delete-modal">

            <div className="delete-symbol">
              <TrashIcon />
            </div>

            <h2>Are you sure you want</h2>
            <h2>to Delete</h2>

            <div className="modal-buttons">

              <button
                className="cancel-delete"
                onClick={() => setDeleteEmployee(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete"
                onClick={confirmDelete}
              >
                Yes
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;