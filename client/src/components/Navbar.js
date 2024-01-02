import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import MyModal from './MyModal';
import MyModalEmployer from './MyModalEmployer';
import { useAuth } from '../Context/AuthState';

export default function Navbar(props) {
  const [navType, setNavType] = useState("JOBSEEKER");
  const location = useLocation();
  const navigate = useNavigate();
  const { userJobSeeker, getUserJobSeeker, getUserEmployer, role, fetchRole } = useAuth();
  const handleNavTypeChange = (newNavType) => {
    setNavType(newNavType);
    navigate('/');
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("auth-token");
    window.location.href = "/jobseeker";
  };

  useEffect(() => {
    if (!role) {
      // Assuming role is a state variable, this check prevents unnecessary calls
      fetchRole();
    }
  }, [role]);

  return (
    <nav className={`navbar ${navType === 'JOBSEEKER' ? 'navbar-expand-lg' : 'navbar-expand-lg navbar-dark bg-dark'}`} style={{ backgroundColor: navType === 'JOBSEEKER' ? '#e3f2fd' : '' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Job Board
        </a>
        <Link
          className="navbar-toggler"
          type="Link"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${navType === 'JOBSEEKER' ? (location.pathname === "/jobseeker" ? "active" : "") : (location.pathname === "/employer" ? "active" : "")}`}
                to={navType === 'JOBSEEKER' ? "/jobseeker" : "/employer"}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${navType === 'JOBSEEKER' ? (location.pathname === "/jobseeker/register" ? "active" : "") : (location.pathname === "/employer/register" ? "active" : "")}`}
                to={navType === 'JOBSEEKER' ? "/jobseeker/register" : "/employer/register"}
              >
                Register
              </Link>
            </li>
            {
              navType === "JOBSEEKER"
                ? role && role.role === "employer"
                  ? (
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${location.pathname === "/jobseeker/login" ? "active" : ""}`}
                        to="/jobseeker/login"
                      >
                        Jobseeker Login
                      </Link>
                    </li>
                  )
                  : role === null
                    ? (
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${location.pathname === "/jobseeker/login" ? "active" : ""}`}
                          to="/jobseeker/login"
                        >
                          Login
                        </Link>
                      </li>
                    )
                    : null
                : navType === "EMPLOYER"
                  ? role && role.role === "jobseeker"
                    ? (
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${location.pathname === "/employer/login" ? "active" : ""}`}
                          to="/employer/login"
                        >
                          Employer Login
                        </Link>
                      </li>
                    )
                    : role === null
                      ? (
                        <li className="nav-item">
                          <Link
                            className={`nav-link ${location.pathname === "/employer/login" ? "active" : ""}`}
                            to="/employer/login"
                          >
                            Login
                          </Link>
                        </li>
                      )
                      : null
                  : null // Handle other cases or set to null if needed
            }
            
            {navType == "EMPLOYER" && localStorage.getItem("auth-token") && role.role=="employer" &&(

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/employer/create" ? "active" : ""}`}
                  to={"/employer/create"}
                >
                  Create A Post
                </Link>
              </li>

            )
            }
          </ul>
          <ul className="navbar-nav">
            {navType === 'JOBSEEKER' && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/employer" ? "active" : ""}`}
                  onClick={() => handleNavTypeChange("EMPLOYER")}
                  to={"/employer"}
                >
                  POST JOBS
                </Link>
              </li>
            )}
            {navType === 'EMPLOYER' && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/jobseeker" ? "active" : ""}`}
                  onClick={() => handleNavTypeChange("JOBSEEKER")}
                  to={"/jobseeker"}
                >
                  FIND JOBS
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/user" ? "active" : ""}`}
                onClick={() => {
                  navType === 'JOBSEEKER' ? getUserJobSeeker() : getUserEmployer();
                }}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="mr-2"
                  style={{ color: "white" }}
                  fontSize="150%"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                />
              </Link>
            </li>
          </ul>
          {navType === 'JOBSEEKER' ? <MyModal /> : <MyModalEmployer />}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  aboutText: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Set Title here",
  aboutText: "About",
};
