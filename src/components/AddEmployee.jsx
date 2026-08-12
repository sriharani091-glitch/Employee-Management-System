import { useState } from "react";

function AddEmployee({ onAdd, onCancel }) {

  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [project, setProject] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !employeeName ||
      !employeeId ||
      !department ||
      !designation ||
      !project ||
      !type ||
      !status
    ) {
      alert("Please fill all fields");
      return;
    }

    const employee = {
      employeeName,
      employeeId,
      department,
      designation,
      project,
      type,
      status
    };

    onAdd(employee);
  };

  return (
    <div className="form-page">

      <div className="form-header">

        <div>
          <h1>Add Employee</h1>
          <p>Personal Information</p>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          <div className="form-group">

            <label>Name *</label>

            <input
              type="text"
              placeholder="Enter name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />

          </div>


          <div className="form-group">

            <label>Employee ID *</label>

            <input
              type="text"
              placeholder="Enter employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />

          </div>


          <div className="form-group">

            <label>Department *</label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >

              <option value="">
                Select Department
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

              <option value="Testing">
                Testing
              </option>

            </select>

          </div>


          <div className="form-group">

            <label>Designation *</label>

            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >

              <option value="">
                Select Designation
              </option>

              <option value="Developer">
                Developer
              </option>

              <option value="Design Lead">
                Design Lead
              </option>

              <option value="Manager">
                Manager
              </option>

              <option value="Tester">
                Tester
              </option>

            </select>

          </div>


          <div className="form-group">

            <label>Project</label>

            <input
              type="text"
              placeholder="Enter project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />

          </div>


          <div className="form-group">

            <label>Type *</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >

              <option value="">
                Select Type
              </option>

              <option value="Office">
                Office
              </option>

              <option value="Remote">
                Remote
              </option>

            </select>

          </div>


          <div className="form-group">

            <label>Status *</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >

              <option value="">
                Select Status
              </option>

              <option value="Permanent">
                Permanent
              </option>

              <option value="Contract">
                Contract
              </option>

            </select>

          </div>

        </div>


        <div className="form-buttons">

          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="confirm-button"
          >
            Confirm
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddEmployee;