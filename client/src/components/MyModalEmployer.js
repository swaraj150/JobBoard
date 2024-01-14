// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthState";

// export default function MyModalEmployer() {
  
//   const { userEmployer } = useAuth();
//   let navigate = useNavigate();
//     const logout=()=>{
//         console.log("Logging out...");
//         localStorage.removeItem("auth-token");
//         window.location.href = "/employer"; 
//         navigate("/employer")
//     }
//   if (userEmployer !== null) {
//     return (
//       <div className="my-3">
//         <div
//           className="modal fade"
//           id="exampleModal"
//           tabIndex="-1"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">
//                   User Info
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
//                   Welcome, {userEmployer.name}
//                 </h4>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={logout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="my-3">
//         <div
//           className="modal fade"
//           id="exampleModal"
//           tabIndex="-1"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">
//                   User Info
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
//                   You'd have to login to access account info
//                 </p>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBuilding, faEnvelope, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const MyModalEmployer = () => {
  const { userEmployer } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("auth-token");
    window.location.href = "/employer";
    navigate("/employer");
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
                Employer Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {userEmployer !== null ? (
                <>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    <h4 className="mb-0">Welcome, {userEmployer.name}</h4>
                  </div>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    Email: {userEmployer.email}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faBuilding} className="me-2" />
                    Company: {userEmployer.companyName}
                  </p>
                  {/* Add more information about the employer as needed */}
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
              {userEmployer !== null && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={logout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModalEmployer;
