import React from "react";
import { Link } from 'react-router-dom';

export default function HomeEmployer() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6">
          <h1 className="display-4 mb-4">Welcome, Employer!</h1>
          <p className="lead">Explore talented candidates and find the perfect fit for your team.</p>
          <Link to="/employer/applicants" className="btn btn-primary btn-lg">Explore Candidates</Link>
        </div>
        {/* <div className="col-lg-6">
        </div> */}
      </div>
    </div>
  );
}
