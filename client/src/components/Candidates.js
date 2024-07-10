
import React, { useEffect, useState } from "react";
import { useJob } from "../Context/JobState";
import { useAuth } from "../Context/AuthState";

const Candidates = () => {
  const { myuserJob, getMyUserJob, updateStatusfun, sendMail } = useJob();
  const { userEmployer, getUserEmployer } = useAuth();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getUserEmployer();
      await getMyUserJob();

    }
    fetchData();
  }, []);

  useEffect(() => {
    if (myuserJob && myuserJob.success) {
      let updatedCandidates = [];
      for (const post of myuserJob.response) {
        for (const candidate of post.candidates) {
          const compositeKey = `${candidate._id}_${post._id}`
          const c = {
            id: compositeKey,
            name: candidate.name,
            email: candidate.email,
            skills: candidate.skills,
            status: candidate.status,
            jobTitle: post.title,
          };
          updatedCandidates.push(c);
        }
      }
      setCandidates(updatedCandidates);
    }
  }, [myuserJob]);

  const handleAccept = async (id1) => {

    const result = candidates.find(obj => obj.id === id1)
    const dataEmployer = {
      to: userEmployer.email,
      subject: "Acknowledgment of Job Offer Acceptance",
      body: `
      Dear ${userEmployer.name},
      
      We hope this email finds you well. This message is to confirm the successful acceptance of the job offer extended to 
      ${result.name} for the ${result.jobTitle} position at ${userEmployer.companyName}.
      `
    }
    const dataJobSeeker = {
      to: result.email,
      subject: `Job Offer for ${result.jobTitle} Position at ${userEmployer.companyName}`,
      body: `
      Dear ${result.name},

      I hope this email finds you well. We are pleased to extend a job offer for the position of ${result.jobTitle} at ${userEmployer.companyName}. After careful consideration of your application and interview, we are confident that your skills and experience align with what we are looking for in a candidate.
      `
    }

    console.log(result.name);
    const [candidateId, postId] = id1.split('_');
    await updateStatusfun({ status: "accepted", p_id: postId, j_id: candidateId })
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === id1) {
        return { ...candidate, status: "accepted" };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
    await sendMail(dataEmployer);
    await sendMail(dataJobSeeker);

  };

  const handleReject = async (id1) => {
    // Handle the "Reject" button click
    // You can add logic here to update the candidate status, remove the candidate from the list, send emails, etc.
    const result = candidates.find(obj => obj.id === id1)

    const dataJobSeeker = {
      to: result.email,
      subject: `Regarding Your Job Application`,
      body:
        `
      Dear ${result.name},
      We appreciate your interest in the ${result.jobTitle} position at ${userEmployer.companyName}. After careful consideration of your application and the interview process, we regret to inform you that we have chosen to move forward with another candidate who closely aligns with the requirements of the role.

      We would like to express our gratitude for the time and effort you invested in the application process. The decision was a challenging one, as we received many qualified applications.
  
      Please keep in mind that the job search process is highly competitive, and your skills and experience are valued. We encourage you to continue pursuing opportunities that match your qualifications, and we wish you the best in your future endeavors.
  
      Thank you once again for considering ${userEmployer.companyName} as a potential employer.
  
      `
    }
    const [candidateId, postId] = id1.split('_');
    await updateStatusfun({ status: "rejected", p_id: postId, j_id: candidateId })
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === id1) {
        return { ...candidate, status: "rejected" };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
    await sendMail(dataJobSeeker);
  };
  if (userEmployer && userEmployer.success) {

  }
  return (
    <div className="container mt-4">
      {candidates.length===0 ? (
        <>
          <h2>
            You don't have any candidates yet!!
          </h2>
        </>
      ):(
        <>
        
          <h2>Candidates</h2>
          <table className="table table-bordered my-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Job Title</th>
                <th>Interested ?</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (


                <tr key={candidate.id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.skills.join(", ")}</td>
                  <td>{candidate.status}</td>
                  <td>{candidate.jobTitle}</td>
                  {/* <td>
                    {candidate.status === "pending" && (
                      <>
                        <button
                          className={`btn btn-light btn-sm ${candidate.status==="accepted" ? "disabled" : ""}`}
                          onClick={() => handleAccept(candidate.id)}
                          disabled={candidate.accepted}
                        >
                          ✓
                        </button>
                        {" "}
                        <button
                          className={`btn btn-light btn-sm ${candidate.status==="rejected" ? "disabled" : ""}`}
                          onClick={() => handleReject(candidate.id)}
                          disabled={candidate.rejected}
                        >
                          ✗
                        </button>
                      </>
                    )}
                    {candidate.status === "accepted" && (
                      <>
                      <button className="btn btn-success btn-sm" disabled >
                        ✓
                      </button>
                      {" "}
                      <button className="btn btn-danger btn-sm" onClick={() => handleReject(candidate.id)}>
                      ✗
                    </button>
                      
                      </>
                    )}
                    {candidate.status === "rejected" && (
                      <>
                      <button className="btn btn-success btn-sm" onClick={() => handleAccept(candidate.id)} >
                        ✓
                      </button>
                      {" "}
                      <button className="btn btn-danger btn-sm" disabled>
                      ✗
                    </button>
                      
                      </>
                    )}
                  </td> */}
                  <td>
                    {candidate.status === "pending" && (
                      <>
                        <button
                          className={`btn btn-light btn-sm ${candidate.status === "accepted" ? "disabled" : ""}`}
                          onClick={() => handleAccept(candidate.id)}
                          disabled={candidate.accepted}
                        >
                          ✓
                        </button>{" "}
                        <button
                          className={`btn btn-light btn-sm ${candidate.status === "rejected" ? "disabled" : ""}`}
                          onClick={() => handleReject(candidate.id)}
                          disabled={candidate.rejected}
                        >
                          ✗
                        </button>
                      </>
                    )}
                    {candidate.status === "accepted" && (
                      <>
                        <button className="btn btn-success btn-sm" disabled>
                          ✓
                        </button>{" "}
                        <button className="btn btn-danger btn-sm" onClick={() => handleReject(candidate.id)}>
                          ✗
                        </button>
                      </>
                    )}
                    {candidate.status === "rejected" && (
                      <>
                        <button className="btn btn-success btn-sm" onClick={() => handleAccept(candidate.id)}>
                          ✓
                        </button>{" "}
                        <button className="btn btn-danger btn-sm" disabled>
                          ✗
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>

      )}
    </div>
  );
  // else if(candidates.length==0) {
  //   return(
  //     <div className="container my-3 text-center">
  //        <p className="lead">No one applied yet!!</p>
  //     </div>
  //   );
  // }
  // else {
  //   return(
  //     <div className="container my-3 text-center">
  //        <p className="lead">Something went wrong</p>
  //     </div>
  //   );
  // }

};

export default Candidates;
