import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployee,
  updateEmployee,
} from "../api/employeeApi";

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

function CameraIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
    >
      <path d="M4 7h4l2-2h4l2 2h4v12H4z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // UPDATE SUCCESS POPUP
  const [showUpdatedPopup, setShowUpdatedPopup] = useState(false);

  // GET EMPLOYEE
  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);

      const response = await getEmployee(id);

      if (response.data.success) {
        setForm(response.data.employee);
      } else {
        setForm(null);
      }
    } catch (error) {
      console.error("Failed to get employee:", error);
      setForm(null);
    } finally {
      setLoading(false);
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    // EMPLOYEE ID - ONLY NUMBERS, MAXIMUM 9 DIGITS
    if (name === "employee_id") {
      const numbersOnly = value.replace(/\D/g, "");

      if (numbersOnly.length <= 9) {
        setForm((prev) => ({
          ...prev,
          employee_id: numbersOnly,
        }));
      }

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // UPDATE EMPLOYEE
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.employee_id ||
      !form.department ||
      !form.designation ||
      !form.type ||
      !form.status
    ) {
      alert("Please fill all required fields");
      return;
    }

    // EMPLOYEE ID - 3 TO 9 DIGITS
    if (!/^\d{3,9}$/.test(form.employee_id)) {
      alert("Employee ID must be between 3 and 9 digits");
      return;
    }

    try {
      setUpdating(true);

      const response = await updateEmployee(id, {
        name: form.name,
        employee_id: form.employee_id,
        department: form.department,
        designation: form.designation,
        project: form.project || "",
        type: form.type,
        status: form.status,
        image: form.image || "",
      });

      console.log("UPDATE RESPONSE:", response.data);

      if (response.data.success) {
        // SHOW SUCCESS POPUP
        setShowUpdatedPopup(true);
      } else {
        alert(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update employee error:", error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to update employee");
      }
    } finally {
      setUpdating(false);
    }
  };

  // POPUP OK
  const handlePopupOk = () => {
    setShowUpdatedPopup(false);
    navigate("/employee");
  };

  if (loading) {
    return <div className="no-data">Loading employee...</div>;
  }

  if (!form) {
    return <div className="no-data">Employee not found</div>;
  }

  return (
    <div className="details-page">

      {/* UPDATE SUCCESS POPUP */}
      {showUpdatedPopup && (
        <div className="modal-overlay">
          <div className="delete-modal">

            <div
              className="delete-symbol"
              style={{
                background: "#ecfdf3",
                color: "#16a34a",
              }}
            >
              <CheckIcon />
            </div>

            <h2>Employee Updated</h2>

            <p>
              Employee details updated successfully.
            </p>

            <div className="modal-buttons">
              <button
                type="button"
                className="confirm-delete"
                onClick={handlePopupOk}
              >
                OK
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TITLE */}
      <div className="details-title">

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/employee")}
        >
          <ArrowLeft />
        </button>

        <h1>Edit Employee Details</h1>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="personal-tab">
        <span>👤</span>
        <span>Personal Information</span>
      </div>

      {/* FORM */}
      <form
        className="employee-form"
        onSubmit={handleUpdate}
      >

        {/* IMAGE */}
        <div className="upload-area">

          <label
            htmlFor="editImage"
            className="image-upload-box"
          >
            {form.image ? (
              <img
                src={form.image}
                alt="Employee"
              />
            ) : (
              <>
                <div className="camera-circle">
                  <CameraIcon />
                </div>

                <span>Upload Photo</span>
              </>
            )}
          </label>

          <input
            id="editImage"
            type="file"
            accept="image/*"
            onChange={handleImage}
            hidden
          />

        </div>

        {/* FORM GRID */}
        <div className="form-grid">

          {/* NAME */}
          <div className="form-group">
            <label>Name*</label>

            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          {/* EMPLOYEE ID */}
          <div className="form-group">
            <label>Employee ID*</label>

            <input
              type="text"
              name="employee_id"
              value={form.employee_id || ""}
              onChange={handleChange}
              placeholder="Enter employee ID"
              inputMode="numeric"
              maxLength={9}
            />

            <small>
              Enter 3 to 9 digits
            </small>
          </div>

          {/* DEPARTMENT */}
          <div className="form-group">
            <label>Department*</label>

            <select
              name="department"
              value={form.department || ""}
              onChange={handleChange}
            >
              <option value="">
                Select department
              </option>

              <option value="Design">
                Design
              </option>

              <option value="Development">
                Development
              </option>

              <option value="HR">
                HR
              </option>

              <option value="Marketing">
                Marketing
              </option>

              <option value="Finance">
                Finance
              </option>
            </select>
          </div>

          {/* DESIGNATION */}
          <div className="form-group">
            <label>Designation*</label>

            <select
              name="designation"
              value={form.designation || ""}
              onChange={handleChange}
            >
              <option value="">
                Select designation
              </option>

              <option value="Design Lead">
                Design Lead
              </option>

              <option value="Developer">
                Developer
              </option>

              <option value="Senior Developer">
                Senior Developer
              </option>

              <option value="HR Manager">
                HR Manager
              </option>

              <option value="Manager">
                Manager
              </option>
            </select>
          </div>

          {/* PROJECT */}
          <div className="form-group">
            <label>Project</label>

            <input
              type="text"
              name="project"
              value={form.project || ""}
              onChange={handleChange}
              placeholder="Enter project"
            />
          </div>

          {/* TYPE */}
          <div className="form-group">
            <label>Type*</label>

            <select
              name="type"
              value={form.type || ""}
              onChange={handleChange}
            >
              <option value="">
                Select type
              </option>

              <option value="Office">
                Office
              </option>

              <option value="Remote">
                Remote
              </option>

              <option value="Hybrid">
                Hybrid
              </option>
            </select>
          </div>

          {/* STATUS */}
          <div className="form-group">
            <label>Status*</label>

            <select
              name="status"
              value={form.status || ""}
              onChange={handleChange}
            >
              <option value="">
                Select status
              </option>

              <option value="Permanent">
                Permanent
              </option>

              <option value="Contract">
                Contract
              </option>

              <option value="Intern">
                Intern
              </option>
            </select>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="form-footer">

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/employee")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="update-button"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default EditEmployee;