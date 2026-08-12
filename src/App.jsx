import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Employee from "./pages/Employee";
import Dashboard from "./pages/Dashboard";
import Calender from "./pages/Calender";
import Message from "./pages/Message";
import "./App.css";

function App() {
  const [page, setPage] = useState("employee");

  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
    setPage("employee");
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(
      (employee) => employee.employeeId !== id
    );

    setEmployees(updatedEmployees);
  };

  return (
    <div className="app">
      <Sidebar setPage={setPage} />

      <main className="main-content">
        {page === "dashboard" && <Dashboard />}

        {page === "employee" && (
          <Employee
            employees={employees}
            onAdd={addEmployee}
            onDelete={deleteEmployee}
          />
        )}

        {page === "calendar" && <Calendar />}

        {page === "messages" && <Messages />}
      </main>
    </div>
  );
}

export default App;