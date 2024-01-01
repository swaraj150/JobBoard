import { useEffect, useState } from "react";
import { useJob } from "../Context/JobState";
import { useParams } from 'react-router-dom';
import { useAuth } from "../Context/AuthState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

export default function Job() {
    const { job, getJob, apply, applySuccess, sendMail } = useJob();
    const { employer, getEmployerById, userJobSeeker, getUserJobSeeker } = useAuth();
    const [employerState, setEmployerState] = useState(null);
    const [applied, setApplied] = useState(false);
    const [applying, setApplying] = useState(false);
    const params = useParams();
    const [application, setApplication] = useState(null);


    const getApplication = async (data) => {
        try {
            console.log("entered getapplication")
            const headers = {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("auth-token")
            }
            const response = await axios.get(`http://localhost:80/api/jobseeker/getapplication?jobId=${data}`, { headers: headers })
            setApplication(response.data);
            console.log("response application ", response.data);
            if (response.data.success) {
                setApplied(true);
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

    const fetchApplications = async () => {
        try {
            console.log("entered getapplication")
            const headers = {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("auth-token")
            }
            const response = await axios.get(`http://localhost:80/api/jobseeker/getapplication?jobId=${params.id}`, { headers: headers })
            setApplication(response.data);
            console.log("response application ", response.data);
            if (localStorage.getItem(params.id) == null) {
                if (response.data.success) {
                    console.log("entered in 11st if");
                    setApplied(true);
                    localStorage.setItem(params.id, "true");

                }
                else {
                    console.log("entered in 12st if");
                    setApplied(false);
                    localStorage.removeItem(params.id);
                }
            }

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setApplication({ error: error.response.data, success: false });
                console.log("application retrieval failed", { error: error.response.data, success: false });
                console.error("application retrieval failed with status code", error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from the server");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up the request", error.message);
            }
        }




    }
    const fetchData = async () => {
        console.log("Before getJob");
        await getJob(params.id);
        console.log("After getJob", job);

        if (job && job.response && job.response.post) {
            console.log("enteree");

            console.log("Before getEmployerById");
            await getEmployerById(job.response.post.employer);
            console.log("After getEmployerById", employer);

            if (employer && employer.success) {
                console.log("Before setEmployerState");
                setEmployerState((prevEmployerState) => {
                    return { ...prevEmployerState, ...employer.user };
                });
                console.log("After setEmployerState", employerState);
            }
        }

        console.log("Before getUserJobSeeker");
        await getUserJobSeeker();
        console.log("After getUserJobSeeker");
        
    };
    useEffect(() => {
        if (localStorage.getItem(params.id) == null) {
            console.log("entered above fetchapplictions")
            fetchApplications();
        }
        console.log("Before fetchData");
        fetchData();
        console.log("After fetchData");

    }, [params.id]);



    const handleApply = async () => {
        if (!employerState) {
            console.log("employer not fetched yet")
        }
        if (!userJobSeeker) {
            console.log("user not fetched yet")
        }
        else {
            const dataEmployer = {
                to: employerState.email,
                subject: "Test Email",
                body: 'This is a test email sent using Nodemailer with a test account.',
            }
            const dataJobSeeker = {
                to: userJobSeeker.email,
                subject: "Test Email",
                body: 'This is a test email sent using Nodemailer with a test account.',
            }
            console.log("applied");

            // Apply for the job
            await apply({ jobId: job.response.post._id });

            // After applying, recheck the application status
            // console.log(response)
            // Check if the user has already applied based on the latest application response
            setApplying(true);
            await getApplication(params.id);
            const hasApplied = application && application.success;
            setApplied(hasApplied);
            localStorage.setItem(params.id, "true");
            setApplying(false);

            // Update the state accordingly

        }
    }
   
    if (!job || job.success === false) {
        return (
            <div className="container my-3 text-center">
                <p>You'd have to Login</p>
            </div>
        );
    } else {
        return (
            <div className="container my-3 d-flex justify-content-center flex-column align-items-center">
                <div className="text-body-secondary my-2">
                    <h2>{job.response.post.title}</h2>
                </div>
                <div className="my-3" style={{ maxWidth: "70rem" }}>
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text">{job.response.post.description}</p>
                            <p className="card-text">
                                <h5>Requirements</h5>
                                {job.response.post.requirements}
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero magni, illum nobis ducimus quia doloribus laudantium, consequuntur fugit facilis commodi animi perspiciatis mollitia quasi adipisci numquam ipsum voluptatum ex. Dolorem atque quas cum repellendus omnis accusamus harum corrupti consequuntur laboriosam, voluptatibus odio assumenda! Temporibus tempora totam vel dolorem, dolores voluptatum! Suscipit doloremque repellendus adipisci tenetur reprehenderit nihil maxime deleniti enim molestias. Natus ullam ipsa nam earum quis soluta dicta asperiores atque fugiat? Beatae laborum ratione voluptas ducimus deleniti veritatis obcaecati vitae natus eos, dolores ullam voluptates, dolor inventore! A amet reprehenderit unde esse quibusdam, ex dolores error repudiandae ducimus rem.

                                <br />
                                <strong>Skills Required:</strong> {job.response.post.skills_required.join(", ")}
                                <br />
                                <strong>Company:</strong> {employerState?.companyName}
                                <br />
                                <strong>Openings:</strong> {job.response.post.openings}
                                <br />
                                <strong>Income:</strong> {job.response.post.income}
                                <br />
                                <strong>
                                    <FontAwesomeIcon icon={faLocation} className="mr-2" style={{ marginRight: "2px" }} />
                                    Location:
                                </strong> {job.response.post.location}
                            </p>


                            <button
                                className="btn btn-primary mt-3"
                                onClick={handleApply}
                                disabled={applying || localStorage.getItem(params.id) == "true"}
                            >
                                {(applying ? "Applying" : (localStorage.getItem(params.id) == "true" || applied ? "Applied" : "Apply"))}
                            </button>                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
