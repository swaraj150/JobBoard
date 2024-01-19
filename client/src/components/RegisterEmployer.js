import { useState, useEffect, useRef } from "react"
import { useRegister } from "../Context/RegisterState"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export default function RegisterEmployer() {
    const myform = useRef(null);
    const { responseEmployer, registerEmployerUser } = useRegister();
    const [data, setData] = useState({ name: "", username: "", email: "", password: "",industry:"",companyName:"" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((d) => ({ ...d, [name]: value }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const {name,username,email,password,industry,companyName}=data;
        if (name === "") {
            toast.error("Name is Required !")
          } else if (username === "") {
            toast.error("Username is Required !")
          } else if (email === "") {
            toast.error("Email is Required !")
          } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
          } else if (password === "") {
            toast.error("Password is Required !")
          } 
          else if (industry === "") {
            toast.error("Industry is Required !")
          } else if (companyName === "") {
            toast.error("Company Name is Required !")
          }
          else{
              await registerEmployerUser(data);

          }
        myform.current.reset();

    }
    useEffect(() => {
        console.log("from register: ", responseEmployer);
        if (responseEmployer && responseEmployer.success) {
            
            localStorage.setItem("auth-token", responseEmployer.authtoken);
            
        }

    }, [responseEmployer]);

    return (
        <div>
            <div className="container my-3 d-flex justify-content-center">
                <form onSubmit={handlesubmit} ref={myform} className="shadow p-5 rounded-lg bg-light  col-md-6">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Name</label>
                        <input className="form-control" id="exampleFormControlTextarea1" name="name" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Username</label>
                        <input className="form-control" id="exampleFormControlTextarea1" name="username" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Email</label>
                        <input className="form-control" id="exampleFormControlTextarea1" name="email" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type={"password"} className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Company Name</label>
                        <input className="form-control" id="exampleFormControlTextarea1" name="companyName" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Industry</label>
                        <input className="form-control" id="exampleFormControlTextarea1" name="industry" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Register</button>
                </form>
                <ToastContainer position="top-center" />
            </div>
        </div>
    )
}