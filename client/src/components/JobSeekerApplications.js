import React, { useEffect, useState } from "react";
import axios from "axios";

const JobSeekerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL=process.env.REACT_APP_BASE_URL || "http://localhost:80";

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        };

        const response = await axios.get(`${BASE_URL}/api/jobseeker/applications`, {
          headers: headers,
        });

        if (response.data.success) {
          setApplications(response.data.applications);
        }
      } catch (error) {
        console.error("Error fetching applications:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-3">
      <h2>Your Job Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="table table-bordered my-3">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.application._id}>
                <td>{application.application.title}</td>
                <td>{application.employer.companyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobSeekerApplications;
