import { useState, useEffect, useRef } from "react"
import { useRegister } from "../Context/RegisterState"
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const myform = useRef(null);
    const { responseJobSeeker, registerJobSeekerUser,showalert } = useRegister();

    const [data, setData] = useState({ name: "", username: "", email: "", password: "",education:"", skills: [] });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((d) => ({ ...d, [name]: value }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const {name,username,email,password,education,skills}=data;
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
          else if (education === "") {
            toast.error("Education is Required !")
          } else if (skills.length === 0) {
            toast.error("Skills are Required !")
          }
          else{
            await registerJobSeekerUser(data);
          }
        myform.current.reset();

    }
    const handleSkillsChange = (selectedOptions) => {
        // Extract skill values and update the state
        const skills = selectedOptions.map((option) => option.value);
        setData((d) => ({ ...d, skills }));
    };
   


    const skillOptions = [
        // Web Development
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "JavaScript", label: "JavaScript" },
        { value: "React", label: "React" },
        { value: "Angular", label: "Angular" },
        { value: "Vue.js", label: "Vue.js" },
        { value: "Node.js", label: "Node.js" },
        { value: "Express.js", label: "Express.js" },
        { value: "RESTful APIs", label: "RESTful APIs" },
        { value: "MongoDB", label: "MongoDB" },
        { value: "SQL", label: "SQL" },
      
        // Programming Languages
        { value: "Java", label: "Java" },
        { value: "Python", label: "Python" },
        { value: "C#", label: "C#" },
        { value: "C++", label: "C++" },
        { value: "Ruby", label: "Ruby" },
        { value: "Go", label: "Go" },
        { value: "Swift", label: "Swift" },
      
        // Data Science
        { value: "Python", label: "Python" },
        { value: "R", label: "R" },
        { value: "Machine Learning", label: "Machine Learning" },
        { value: "Data Analysis", label: "Data Analysis" },
        { value: "Data Visualization", label: "Data Visualization" },
        { value: "SQL", label: "SQL" },
      
        // Design
        { value: "Adobe Photoshop", label: "Adobe Photoshop" },
        { value: "Adobe Illustrator", label: "Adobe Illustrator" },
        { value: "Sketch", label: "Sketch" },
        { value: "Figma", label: "Figma" },
        { value: "UI/UX Design", label: "UI/UX Design" },
      
        // DevOps
        { value: "Docker", label: "Docker" },
        { value: "Kubernetes", label: "Kubernetes" },
        { value: "Jenkins", label: "Jenkins" },
        { value: "Git", label: "Git" },
        { value: "Continuous Integration", label: "Continuous Integration" },
        { value: "Infrastructure as Code", label: "Infrastructure as Code" },
      ];
    useEffect(() => {
        // console.log("from register: ", responseJobSeeker);
        if (responseJobSeeker && responseJobSeeker.success) {
            localStorage.setItem("auth-token", responseJobSeeker.authtoken);
            showalert("Registered Succesfully","success");

            // if(localStorage.getItem("auth-token")){
            //     window.location.href = "/quizlist";
            // } 
        }
        else{
            showalert("Something went wrong","danger");

        }

    }, [responseJobSeeker]);

    return (
        <div>
            <div className="container my-3 d-flex justify-content-center">
                <form onSubmit={handlesubmit} ref={myform}  className="shadow p-5 rounded-lg  col-md-6">
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
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Highest Qualification</label>
                        <input className="form-control" id="exampleFormControlTextarea1" name="education" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">
                            Skills
                        </label>
                        <Select
                            isMulti
                            options={skillOptions}
                            onChange={handleSkillsChange}
                            maxMenuHeight={100}
                        />
                    </div>
                    <button type="submit" className=" my-2 btn btn-primary" onSubmit={handlesubmit}>Register</button>
                </form>
                <ToastContainer position="top-center" />

            </div>
        </div>
    )
}