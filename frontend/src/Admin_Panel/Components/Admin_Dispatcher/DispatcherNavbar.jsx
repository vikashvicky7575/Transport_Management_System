import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Dispatcher_Navbar.module.css";
import { useSelector } from "react-redux";
import CurrentDateandTime from "../../Pages/DispatchPanel/CurrentDateandTime/CurrentDateandTime";

const DispatcherNavbar = () => {
  const [openMenu, setOpenMenu] = useState({
    trip: false,
    maintenance: false,
  });

  // debug helper
  const debugToggle = (key) => {
    setOpenMenu((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      console.log("toggle:", key, "=>", next[key]);
      return next;
    });
  };

  const toggleTrip = () => debugToggle("trip");
  const toggleMaintenance = () => debugToggle("maintenance");

  // fetching the dispatchername automatically using redux-saga
  const { authUser } = useSelector((state) => state.authStore);

  return (
    <>
      <div className={styles.container}>
        {/* Top Navbar */}
        <nav className={`navbar navbar-expand-lg navbar-dark ${styles.topNavbar}`}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Dispatcher Panel
            </Link>
            <CurrentDateandTime />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#driverNavbar"
              aria-controls="driverNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="driverNavbar">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <button
                    className="btn nav-link dropdown-toggle d-flex align-items-center"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    type="button"
                  >
                    <i className="fas fa-user-circle me-2"></i>
                    {authUser?.name ? `Welcome, ${authUser.name}` : "Profile"}
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <li>
                      <Link className="dropdown-item" to="/dispatcher/viewProfile">
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/dispatcher/change-password">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item text-danger" to="/login">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <ul className="nav flex-column">
            {/* Dashboard */}
            <NavLink
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
              to="/dispatcher/dashboard"
            >
              <i className="fas fa-tachometer-alt fa-md me-2"></i> Dashboard
            </NavLink>

            {/* Trip Schedule */}
            <li className={`nav-item ${styles.dropdownContainer}`}>
              <div
                className={`nav-link ${styles.navLink} ${styles.dropdownToggle}`}
                onClick={toggleTrip}
                role="button"
                aria-expanded={openMenu.trip}
              >
                <i className="fas fa-calendar-alt fa-md me-2"></i> Trip Schedule
              </div>

              <ul
                className={`${styles.dropdownMenu} ${openMenu.trip ? styles.open : ""}`}
                style={{ display: openMenu.trip ? "block" : "none" }}
              >
                <li>
                  <NavLink
                    to="/dispatcher/tripSchedule"
                    className={({ isActive }) => `dropdown-item ${isActive ? styles.activeLink : ""}`}
                  >
                    Add Trip
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dispatcher/vehicleOnTrip"
                    className={({ isActive }) => `dropdown-item ${isActive ? styles.activeLink : ""}`}
                  >
                    OnTrip Vehicle
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Available Drivers */}
            <NavLink
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
              to="/dispatcher/availableDrivers"
            >
              <i className="fas fa-id-card fa-md me-2"></i> Available Drivers
            </NavLink>

            {/* Available Vehicles */}
            <NavLink
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
              to="/dispatcher/availableVehicles"
            >
              <i className="fas fa-truck fa-md me-2"></i> Available Vehicles
            </NavLink>

            {/* Trip History */}
            <NavLink
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
              to="/dispatcher/tripHistory"
            >
              <i className="fas fa-route fa-md me-2"></i> Trip History
            </NavLink>

            {/* Under Maintenances Dropdown */}
            <li className={`nav-item ${styles.dropdownContainer}`}>
              <div
                className={`nav-link ${styles.navLink} ${styles.dropdownToggle}`}
                onClick={toggleMaintenance}
                role="button"
                aria-expanded={openMenu.maintenance}
              >
                <i className="fas fa-calendar-alt fa-md me-2"></i> Under Maintenance
              </div>

              <ul
                className={`${styles.dropdownMenu} ${openMenu.maintenance ? styles.open : ""}`}
                style={{ display: openMenu.maintenance ? "block" : "none" }}
              >
                <li>
                  <NavLink
                    to="/dispatcher/maintenacesForm"
                    className={({ isActive }) => `dropdown-item ${isActive ? styles.activeLink : ""}`}
                  >
                    Maintenance Form
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dispatcher/mainteancesList"
                    className={({ isActive }) => `dropdown-item ${isActive ? styles.activeLink : ""}`}
                  >
                    Maintenance List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dispatcher/mainteanceHistory"
                    className={({ isActive }) => `dropdown-item ${isActive ? styles.activeLink : ""}`}
                  >
                    Maintenance History
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DispatcherNavbar;
