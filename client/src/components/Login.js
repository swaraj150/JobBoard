import { useState, useEffect, useRef } from "react"
import { useAuth } from "../Context/AuthState"
import { useNavigate } from 'react-router-dom';
import { useRegister } from "../Context/RegisterState"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    let navigate = useNavigate();
    const myform = useRef(null);
    const { responseJobSeeker, checkJobSeekerAuth } = useAuth();
    const [cred, setCred] = useState({ email: "", password: "" });
    const { showalert } = useRegister();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCred((prevCred) => ({ ...prevCred, [name]: value }));
    };

    
    const handlesubmit = async (e) => {
        e.preventDefault();
        const {email,password}=cred;
         if (email === "") {
            toast.error("Email is Required !")
          } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
          } else if (password === "") {
            toast.error("Password is Required !")
          } 
          else {
            await checkJobSeekerAuth(cred);
            
    
          
            
        }

      
        myform.current.reset();

    }

    useEffect(() => {

        if (responseJobSeeker) {
            if (responseJobSeeker.success) {
                toast.success("Logged in Successfully");
                localStorage.setItem("auth-token", responseJobSeeker.authtoken);                
                if (localStorage.getItem("auth-token")) {
                    navigate("/");
                }
            } else {
                toast.error(responseJobSeeker.error);
            }
        }

    }, [responseJobSeeker]);

    return (
        <div>
            <div className="container my-5 d-flex justify-content-center">
                <form onSubmit={handlesubmit} ref={myform} className="shadow p-5 rounded-lg  col-md-6">
                    <h2 className="text-center mb-4">Login</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" name="email" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} required />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Login</button>
                    </div>
                </form>
                <ToastContainer position="top-center" />
            </div>
        </div>



    );
}