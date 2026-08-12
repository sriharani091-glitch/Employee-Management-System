import { useState } from "react";
import AddEmployee from "../components/AddEmployee";
import EmployeeList from "../components/EmployeeList";

function Employee({ employees, onAdd, onDelete }) {

  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="page">

      {!showAdd ? (
        <>
          <div className="page-header">

            <div>
              <h1>Employees</h1>
              <p>Manage your employees</p>
            </div>

            <button
              className="add-button"
              onClick={() => setShowAdd(true)}
            >
              + Add Employee
            </button>

          </div>

          <EmployeeList
            employees={employees}
            onDelete={onDelete}
          />
        </>
      ) : (
        <AddEmployee
          onAdd={onAdd}
          onCancel={() => setShowAdd(false)}
        />
      )}

    </div>
  );
}

export default Employee;