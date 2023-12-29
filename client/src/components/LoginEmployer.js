import { useState, useEffect, useRef } from "react"
import { useAuth } from "../Context/AuthState"
import { useNavigate } from 'react-router-dom';
import { useRegister } from "../Context/RegisterState"
export default function LoginEmployer() {
    let navigate = useNavigate();
    const myform = useRef(null);
    const { responseEmployer, checkEmployerAuth } = useAuth();
    const [cred, setCred] = useState({ email: "", password: "" });
    const { showalert } = useRegister();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCred((prevCred) => ({ ...prevCred, [name]: value }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        await checkEmployerAuth(cred);
        myform.current.reset();

    }

    useEffect(() => {
        console.log("from Login: ", responseEmployer);

        if (responseEmployer && responseEmployer.success) {
            localStorage.setItem("auth-token", responseEmployer.authtoken);
            showalert("Logged in Succesfully","success");
           
            // if (localStorage.getItem("auth-token")) {
            //     window.location.href = "/quizlist";
            // }
        }
       else{
            showalert("Something went wrong","danger");
        }
    }, [responseEmployer, navigate]);

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