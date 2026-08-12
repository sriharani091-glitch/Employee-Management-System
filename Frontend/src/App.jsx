import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import AddEmployee from "./pages/AddEmployee";
import ViewEmployee from "./pages/ViewEmployee";
import EditEmployee from "./pages/EditEmployee";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import Sidebar from "./components/Sidebar";
import "./App.css";


function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">

        <header className="top-header">
          <div></div>

          <div className="header-icons">

            <button className="header-icon" title="Settings">
  ⚙️
</button>

            {/* NOTIFICATION */}
            <button className="header-icon" title="Notification">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>
            </button>


            {/* PROFILE */}
            <div className="top-profile">
              <div className="profile-avatar">S</div>
            </div>

          </div>
        </header>


        <main className="page-area">
          {children}
        </main>

      </div>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="*"
          element={
            <Layout>

              <Routes>

                <Route
                  path="/"
                  element={<Navigate to="/employee" replace />}
                />

                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />

                <Route
                  path="/employee"
                  element={<Employee />}
                />

                <Route
                  path="/employee/add"
                  element={<AddEmployee />}
                />

                <Route
                  path="/employee/view/:id"
                  element={<ViewEmployee />}
                />

                <Route
                  path="/employee/edit/:id"
                  element={<EditEmployee />}
                />

                <Route
                  path="/calendar"
                  element={<Calendar />}
                />

                <Route
                  path="/messages"
                  element={<Messages />}
                />

              </Routes>

            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}


export default App;