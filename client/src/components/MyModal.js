// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthState";
import JobSeekerApplications from "./JobSeekerApplications";

export default function MyModal() {
  const { userJobSeeker } = useAuth();
//   let navigate = useNavigate();
    const logout=()=>{
        console.log("Logging out...");
        // localStorage.removeItem("auth-token");
        localStorage.clear();
        window.location.href = "./"; 
        // navigate("/")
    }
  
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
                User Info
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
                  <h4 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                    Welcome, {userJobSeeker.name}
                  </h4>
                  {/* <JobSeekerApplications /> */}
                  <Link to="/jobseeker/applications" className="btn btn-primary">
                    View Applications
                  </Link>
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
                <button type="button" className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

