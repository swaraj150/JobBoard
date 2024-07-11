import React, { useState, useEffect } from "react";
import { useJob } from "../Context/JobState";
import { Link } from 'react-router-dom';
import JobModal from "./JobModal";

export default function Home() {
  const { jobList, getAllJob } = useJob();
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // console.log("useEffect is running");
    getAllJob();
  }, []);

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    const truncated = words.slice(0, wordLimit).join(' ');
    return words.length > wordLimit ? `${truncated}...` : truncated;
  };

  const openJobModal = (job) => {
    setSelectedJob(job);
  };

  if (!jobList || jobList.response.length === 0) {
    console.log("loading");
    return (
      <div className="container my-3 text-center">
        <p>Loading...</p>
      </div>
    );
  } else if (jobList.success) {
    return (
      <div className="container my-3">
        <h2>Job List</h2>
        <div className="row my-3">
          {jobList.response.map((job) => (
            <div key={job._id} className="col-md-4 mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => openJobModal(job)}>
              <div className="card" style={{maxWidth:"25rem"}}>
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">{truncateDescription(job.description, 17)} </p>
                  <Link to={`/jobseeker/job/${job._id}`} className="btn btn-primary" >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedJob && (
          <JobModal title={selectedJob.title} description={selectedJob.description} />
        )}
      </div>
    );
  }
}