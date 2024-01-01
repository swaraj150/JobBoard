import React, { useEffect, useState } from "react";
import axios from "axios";

const JobSeekerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        };

        const response = await axios.get("http://localhost:80/api/jobseeker/applications", {
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
        <ul>
          {applications.map((application) => (
            <li key={application._id}>
              <strong>Job Title:</strong> {application.title}<br />
              <strong>Company:</strong> {application.description}<br />
              {/* Add more details as needed */}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobSeekerApplications;
