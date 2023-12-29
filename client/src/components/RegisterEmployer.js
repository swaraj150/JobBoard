import { useState, useEffect, useRef } from "react"
import { useRegister } from "../Context/RegisterState"

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
        await registerEmployerUser(data);
        myform.current.reset();

    }
    useEffect(() => {
        console.log("from register: ", responseEmployer);
        if (responseEmployer && responseEmployer.success) {
            localStorage.setItem("auth-token", responseEmployer.authtoken);
            // if(localStorage.getItem("auth-token")){
            //     window.location.href = "/quizlist";
            // } 
        }

    }, [responseEmployer]);

    return (
        <div>
            <div className="my-3">
                <form onSubmit={handlesubmit} ref={myform}>
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
                    <button type="submit" className="btn btn-primary" onSubmit={handlesubmit}>Register</button>
                </form>
            </div>
        </div>
    )
}