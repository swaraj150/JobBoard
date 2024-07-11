import { useEffect } from "react";
import { useJob } from "../Context/JobState";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation } from '@fortawesome/free-solid-svg-icons';


export default function EmployerPost() {
    const { job, getJob } = useJob();
    // const { userJobSeeker, getUserJobSeeker } = useAuth();

    const params = useParams();
    const fetchData = async () => {
        // console.log("Before getJob");
        await getJob(params.id);
        // console.log("After getJob", job);





    };
    useEffect(() => {

        // console.log("Before fetchData");
        fetchData();
        // console.log("After fetchData");

    }, [params.id]);



   

    if (!job || job.success === false) {
        return (
            <div className="container my-3 text-center">
                <p>Loading..</p>
            </div>
        );
    } else {
        return (
            <div className="container my-3 d-flex justify-content-center flex-column align-items-center">
                <div className="text-body-secondary my-2">
                    <h2>{job.response.post.title}</h2>
                </div>
                <div className="my-3" style={{ maxWidth: "70rem" }}>
                    <div className="card shadow rounded-lg">
                        <div className="card-body">
                            <p className="card-text">{job.response.post.description}</p>
                            <p className="card-text">
                                <h5>Requirements</h5>
                                {job.response.post.requirements}
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero magni, illum nobis ducimus quia doloribus laudantium, consequuntur fugit facilis commodi animi perspiciatis mollitia quasi adipisci numquam ipsum voluptatum ex. Dolorem atque quas cum repellendus omnis accusamus harum corrupti consequuntur laboriosam, voluptatibus odio assumenda! Temporibus tempora totam vel dolorem, dolores voluptatum! Suscipit doloremque repellendus adipisci tenetur reprehenderit nihil maxime deleniti enim molestias. Natus ullam ipsa nam earum quis soluta dicta asperiores atque fugiat? Beatae laborum ratione voluptas ducimus deleniti veritatis obcaecati vitae natus eos, dolores ullam voluptates, dolor inventore! A amet reprehenderit unde esse quibusdam, ex dolores error repudiandae ducimus rem.

                                <br />
                                <strong>Skills Required:</strong> {job.response.post.skills_required.join(", ")}
                                <br />
                                <strong>Company:</strong> {job.response.post.employerObj.companyName}
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


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
