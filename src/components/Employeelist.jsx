function EmployeeList({ employees, onDelete }) {

  if (employees.length === 0) {

    return (
      <div className="employee-table">

        <table>

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
            <tr>
              <td colSpan="8" className="no-record">
                No records found
              </td>
            </tr>
          </tbody>

        </table>

      </div>
    );
  }


  return (
    <div className="employee-table">

      <table>

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

          {employees.map((employee) => (

            <tr key={employee.employeeId}>

              <td>{employee.employeeName}</td>

              <td>{employee.employeeId}</td>

              <td>{employee.department}</td>

              <td>{employee.designation}</td>

              <td>{employee.project}</td>

              <td>{employee.type}</td>

              <td>{employee.status}</td>

              <td>

                <button
                  className="delete-button"
                  onClick={() => onDelete(employee.employeeId)}
                >
                  🗑️
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeList;