import { useState, useEffect, useRef } from "react"
import { useAuth } from "../Context/AuthState"
import { useNavigate } from 'react-router-dom';
import { useRegister } from "../Context/RegisterState"

export default function Login() {
    let navigate = useNavigate();
    const myform = useRef(null);
    const { responseJobSeeker,checkJobSeekerAuth } = useAuth();
    const [cred, setCred] = useState({ email: "", password: "" });
    const { showalert } = useRegister();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCred((prevCred) => ({ ...prevCred, [name]: value }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        await checkJobSeekerAuth(cred);
        myform.current.reset();

    }

    useEffect(() => {
        console.log("from Login: ", responseJobSeeker);

        if (responseJobSeeker && responseJobSeeker.success) {
            localStorage.setItem("auth-token", responseJobSeeker.authtoken);


            showalert("Registered Succesfully","success");

            
            // Redirect to "/quizlist" after successful login
            if (localStorage.getItem("auth-token")) {
                window.location.href = "/jobseeker";
            }
        }
        else{
            showalert("Something went wrong","danger");

        }
        
    }, [responseJobSeeker, navigate]);

    return (
        <div>
            <div className="my-3">
                <form onSubmit={handlesubmit} ref={myform}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Email</label>
                        <input className="form-control" id="exampleFormControlTextarea1" name="email" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}