import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const MyModal = () => {
  const { userJobSeeker } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logging out...");
    localStorage.clear();
    window.location.href = "/";
    navigate("/");
  };

  return (
    <div className="my-3">
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                JobSeeker Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {userJobSeeker !== null ? (
                <>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    <h4 className="mb-0">Welcome, {userJobSeeker.name}</h4>
                  </div>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    Email: {userJobSeeker.email}
                  </p>
                  {/* Add more information about the job seeker as needed */}
                </>
              ) : (
                <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  You'd have to login to access account info
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {userJobSeeker !== null && (
                <>
                  <Link to="/jobseeker/applications" className="btn btn-primary me-2">
                    View Applications
                  </Link>
                  <button type="button" className="btn btn-danger" onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
