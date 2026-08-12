import React from "react";
import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiUsers,
  FiMessageSquare,
  FiCalendar,
} from "react-icons/fi";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="logo">
        Employee Management
      </div>

      {/* SIDEBAR NAVIGATION */}
      <nav className="sidebar-nav">

        {/* DASHBOARD */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>

        {/* EMPLOYEE */}
        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FiUsers />
          <span>Employee</span>
        </NavLink>

        {/* MESSAGES */}
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FiMessageSquare />
          <span>Messages</span>
        </NavLink>

        {/* CALENDAR */}
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FiCalendar />
          <span>Calendar</span>
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;