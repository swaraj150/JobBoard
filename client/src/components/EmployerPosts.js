import { useEffect } from "react";
import { useJob } from "../Context/JobState"
import { Link } from "react-router-dom";

export default function EmployerPosts() {
    const {myuserJob, getMyUserJob}=useJob();
    useEffect(()=>{
        getMyUserJob();
    },[])
    return (
    <div className="container my-3">
        {myuserJob && myuserJob.success? (
                        <div className='d-flex justify-content-center'>
                            {myuserJob.response.length > 0 ? (
                                <div>
                                    {myuserJob.response.map((job) => (
                                        <div key={job._id} className="col-md-4 mb-3">
                                            <div className="card shadow rounded-lg" style={{ width:"30rem", height:"15rem" }}>
                                                <div className="card-body d-flex flex-column justify-content-center align-items-center ">
                                                    <h5 className="card-title">{job.title}</h5>
                                                    <p className="card-text">{job.description} </p>
                                                    <Link to={`/employer/job/${job._id}`} className="btn btn-primary" >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            ): (
                                <p>No posts found.</p>
                            )}
                        </div>
                    ) : (
                        <p>No posts found.</p>
                    )}
                
    </div>
  )
}