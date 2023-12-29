import React, { useState, useEffect } from "react";
import { useJob } from "../Context/JobState";
import { Link } from 'react-router-dom';

export default function Home() {
  const {jobList, getAllJob} =useJob();
  
  useEffect(() => {
    console.log("useEffect is running");
    getAllJob();
  }, []);

  if (!jobList || jobList.response.length==0) {
    console.log("loading")
    return (
      <div className="container my-3 text-center">
        <p>Loading...</p>
      </div>
    );
  }
  else if(jobList.success){
    
    return (
      <div className="container my-3">
        <h2>Job List</h2>
        <div className="row my-3">
          {jobList.response.map((job) => (
            <div key={job._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">{job.description}</p>
                  <Link to={`/job/${job._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
 
  

}
