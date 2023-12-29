import { useState, useEffect, useRef } from "react"
import { useRegister } from "../Context/RegisterState"
import Select from "react-select";

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
        await registerJobSeekerUser(data);
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
        console.log("from register: ", responseJobSeeker);
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
                    <button type="submit" className="btn btn-primary" onSubmit={handlesubmit}>Register</button>
                </form>
            </div>
        </div>
    )
}