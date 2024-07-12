import { useEffect, useState,useCallback } from "react";
import { useJob } from "../Context/JobState";
import { useAsyncError, useParams } from 'react-router-dom';
import { useAuth } from "../Context/AuthState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import debounce from 'lodash/debounce';

export default function Job() {
    const BASE_URL=process.env.REACT_APP_BASE_URL || "http://localhost:80";
    const { job, getJob, apply, sendMail } = useJob();
    const { userJobSeeker, getUserJobSeeker } = useAuth();
    const [applied, setApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const params = useParams();
    const [application, setApplication] = useState(null);
    const [jobPost,setJobPost]=useState(null);

    const getApplication = async (data) => {
        try {
            // console.log("entered getapplication")
            const headers = {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("auth-token")
            }
            const response = await axios.get(`${BASE_URL}/api/jobseeker/getapplication?jobId=${data}`, { headers: headers })
            setApplication(response.data);
            // console.log("response application ", response.data);
            if (response.data.success) {
                setApplied(true);
            }
        } catch (error) {
            if (error.response) {

                setApplication({ error: error.response.data, success: false });
                // console.log("application retrieval failed", { error: error.response.data, success: false });
                // console.error("application retrieval failed with status code", error.response.status);
            } else if (error.request) {
                console.error("No response received from the server");
            } else {
                console.error("Error setting up the request", error.message);
            }
        }
    }

    const fetchApplications = async () => {
        try {
            console.log("entered getapplication")
            const headers = {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("auth-token")

            }
            const response = await axios.get(`${BASE_URL}/api/jobseeker/getapplication?jobId=${params.id}`, { headers: headers })
            setApplication(response.data);
            console.log("response application ", response.data);
            if (localStorage.getItem(params.id) == null) {
                if (response.data.success) {
                    setApplied(true);
                    localStorage.setItem(params.id, "true");

                }
                else {
                    setApplied(false);
                    localStorage.removeItem(params.id);
                }
            }

        } catch (error) {
            if (error.response) {

                setApplication({ error: error.response.data, success: false });
                console.log("application retrieval failed", { error: error.response.data, success: false });
                console.error("application retrieval failed with status code", error.response.status);
            } else if (error.request) {
                console.error("No response received from the server");
            } else {
                console.error("Error setting up the request", error.message);
            }
        }




    }
    const fetchData = async (signal) => {
        const jobRes=await getJob(params.id, signal)
        console.log("job fetched",jobRes);
        
        if(jobRes && jobRes.response && !jobRes.cancelled){
            setJobPost(jobRes);
            setLoading(false);
        } 
        // setJobPost(jobRes.response);
        
        await getUserJobSeeker();

    };
    const debouncedFetchData = useCallback(
        debounce((signal) => fetchData(signal), 300),
        [fetchData]
      );
    
    useEffect(() => {
        // let isMounted=true;
        const controller = new AbortController();
        // const signal = controller.signal;

        if (localStorage.getItem(params.id) == null) {
            console.log("entered above fetchapplictions")
            fetchApplications();
        }
        fetchData(controller.signal);
        // debouncedFetchData(controller.signal);
        return () => {
            controller.abort()
            // console.log("aborting", controller.signal.aborted)
            setJobPost(null);
        };

    }, []);

    // useEffect(()=>{
    //     console.log("jobPost: ",jobPost)
    // },[jobPost])



    const handleApply = async () => {

        if (!userJobSeeker) {
            toast.error("You'd have to login to apply");
            // console.log("user not fetched yet")
        }
        else {
            const dataEmployer = {
                to: job.response.post.employerObj.email,
                subject: `Acknowledgment for Job Application`,
                body: `
                Dear ${job.response.post.employerObj.name},
                
                We hope this email finds you well. This message is to acknowledge the job application from 
                ${userJobSeeker.name} for the ${job.response.post.title} position at ${job.response.post.employerObj.companyName}.
                `
            }
            const dataJobSeeker = {
                to: userJobSeeker.email,
                subject: `Acknowledgment for Job Application`,
                body: `
                Dear ${userJobSeeker.name},
          
                I hope this email finds you well. This message is to confirm the application for ${job.response.post.title} at ${job.response.post.employerObj.companyName}.                 `
            }


            // Apply for the job
            await apply({ jobId: job.response.post._id });

            // After applying, recheck the application status
            // console.log(response)
            // Check if the user has already applied based on the latest application response
            await sendMail(dataEmployer);
            await sendMail(dataJobSeeker);
            setApplying(true);
            await getApplication(params.id);
            const hasApplied = application && application.success;
            setApplied(hasApplied);
            localStorage.setItem(params.id, "true");
            setApplying(false);
            toast.success("Application successful!!");
            // Update the state accordingly

        }
    }

    // if (!jobPost || jobPost.success === false) {
    //     return (
    //         <div className="container my-3 text-center">
    //             <p>You'd have to Login</p>
    //         </div>
    //     );
    // } else {

    return (
        <div className="container my-3 d-flex justify-content-center flex-column align-items-center">
            {loading || !jobPost || jobPost.success === false? (
                <p>{loading ? "Loading..." : "You'd have to login to see posts"}</p>
            ) : (
                <>
                
                    <div className="text-body-secondary my-2">
                        <h2>{jobPost.response.post.title}</h2>
                    </div>
                    <div className="my-3" style={{ maxWidth: "70rem" }}>
                        <div className="card shadow rounded-lg">
                            <div className="card-body">
                                <p className="card-text">{jobPost.response.post.description}</p>
                                <p className="card-text">
                                    <h5>Requirements</h5>
                                    {jobPost.response.post.requirements}

                                    <br />
                                    <strong>Skills Required:</strong> {jobPost.response.post.skills_required.join(", ")}
                                    <br />
                                    <strong>Company:</strong> {jobPost.response.post.employerObj.companyName}
                                    <br />
                                    <strong>Openings:</strong> {jobPost.response.post.openings}
                                    <br />
                                    <strong>Income:</strong> {jobPost.response.post.income}
                                    <br />
                                    <strong>
                                        <FontAwesomeIcon icon={faLocation} className="mr-2" style={{ marginRight: "2px" }} />
                                        Location:
                                    </strong> {jobPost.response.post.location}
                                </p>


                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={handleApply}
                                    disabled={applying || localStorage.getItem(params.id) === "true"}
                                >
                                    {(applying ? "Applying" : (localStorage.getItem(params.id) === "true" || applied ? "Applied" : "Apply"))}
                                </button>                        </div>
                        </div>
                    </div>
                </>
                )}
            <ToastContainer position="top-center" />
        </div>
    );
    // }
}
