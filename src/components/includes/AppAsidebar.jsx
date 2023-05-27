import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const AppAsidebar = () => {
    const location = useLocation;
    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <NavLink to="/dashboard"  className={`nav-link ${
                                location.pathname === "/dashboard" ? "active" : ""
                            }`}>
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/users" className={`nav-link ${
                            location.pathname === "/users" ? "active" : ""
                            }`}>
                            <i className="bi bi-person-lines-fill"></i><span>Users</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/services" className={`nav-link ${
                            location.pathname === "/services" ? "active" : ""
                            }`}>
                            <i className="ri-archive-drawer-fill"></i><span>Services</span>
                        </NavLink>
                    </li>
                </ul>

            </aside>
        </>
    )
}

export default AppAsidebar