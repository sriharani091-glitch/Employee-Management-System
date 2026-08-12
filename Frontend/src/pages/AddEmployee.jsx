import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../api/employeeApi";

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

function AddEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
  });

  const showPopup = (message) => {
    setPopup({
      show: true,
      message,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      message: "",
    });
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "employee_id") {
      // Numbers only
      const numbersOnly = value.replace(/\D/g, "");

      // Maximum 9 digits
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

  // =========================
  // IMAGE UPLOAD
  // =========================
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

  // =========================
  // ADD EMPLOYEE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields
    if (
      !form.name.trim() ||
      !form.employee_id ||
      !form.department ||
      !form.designation ||
      !form.type ||
      !form.status
    ) {
      alert("Please fill all required fields");
      return;
    }

    // Employee ID: 3 to 9 digits
    if (!/^\d{3,9}$/.test(form.employee_id)) {
      showPopup("Invalid Employee ID");
      return;
    }

    try {
      setLoading(true);

      const response = await addEmployee({
        name: form.name.trim(),
        employee_id: form.employee_id,
        department: form.department,
        designation: form.designation,
        project: form.project || "",
        type: form.type,
        status: form.status,
        image: form.image || "",
      });

      console.log("ADD RESPONSE:", response.data);

      if (response.data.success) {
        navigate("/employee");
      } else {
        showPopup(response.data.message || "Failed to add employee");
      }
    } catch (error) {
      console.error("Add employee error:", error);
      console.error("Server response:", error.response?.data);

      showPopup(
        error.response?.data?.message || "Failed to add employee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-page">

      {/* POPUP */}
      {popup.show && (
        <div className="modal-overlay">
          <div className="delete-modal">

            <div className="delete-symbol">
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>

            <h2>Invalid Employee ID</h2>

            <p>{popup.message}</p>

            <div className="modal-buttons">
              <button
                type="button"
                className="cancel-delete"
                onClick={closePopup}
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

        <h1>Add Employee Details</h1>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="personal-tab">
        <span>👤</span>
        <span>Personal Information</span>
      </div>

      {/* FORM */}
      <form
        className="employee-form"
        onSubmit={handleSubmit}
      >

        {/* IMAGE */}
        <div className="upload-area">

          <label
            htmlFor="imageUpload"
            className="image-upload-box"
          >
            {form.image ? (
              <img
                src={form.image}
                alt="Preview"
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
            id="imageUpload"
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
              value={form.name}
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
              value={form.employee_id}
              onChange={handleChange}
              placeholder="Enter employee ID"
              inputMode="numeric"
              maxLength={9}
            />
          </div>

          {/* DEPARTMENT */}
          <div className="form-group">
            <label>Department*</label>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option value="">Select department</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* DESIGNATION */}
          <div className="form-group">
            <label>Designation*</label>

            <select
              name="designation"
              value={form.designation}
              onChange={handleChange}
            >
              <option value="">Select designation</option>
              <option value="Design Lead">Design Lead</option>
              <option value="Developer">Developer</option>
              <option value="Senior Developer">
                Senior Developer
              </option>
              <option value="HR Manager">HR Manager</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {/* PROJECT */}
          <div className="form-group">
            <label>Project</label>

            <input
              type="text"
              name="project"
              value={form.project}
              onChange={handleChange}
              placeholder="Enter project"
            />
          </div>

          {/* TYPE */}
          <div className="form-group">
            <label>Type*</label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="Office">Office</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* STATUS */}
          <div className="form-group">
            <label>Status*</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
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
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddEmployee;