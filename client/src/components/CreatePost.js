import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useJob } from "../Context/JobState";

export default function CreatePost() {
  const { response, createJob } = useJob();
  const myform = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    skills_required: [],
    openings: 1,
    income: "",
    location: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSkillsChange = (selectedOptions) => {
    // Extract skill values and update the state
    const skills = selectedOptions.map((option) => option.value);
    setFormData((d) => ({ ...d, skills_required: skills }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to submit the form data and create a new job post
    const { title,
      description,
      requirements,
      skills_required,
      openings, 
      income,
      location } = formData;
    if (title === "" || description === "" || requirements === "" || skills_required.length === 0 || openings === "" || income === "" || location===" " ) {
      toast.error("Enter all the fields !")
    } 
    else{
      await createJob(formData)

    }
    if (myform.current) {
      myform.current.reset();
      setFormData({
        title: "",
        description: "",
        requirements: "",
        skills_required: [],
        openings: 1,
        income: "",
        location: "",
      });
      // console.log("Form reset");
    }
    // console.log("Form submitted:", formData);
    // Redirect to the desired page after creating the post (e.g., job list)
  };
  useEffect(()=>{
    if(response){
      if(response.success){
        toast.success("Post Created!")
      }
      else{
        toast.success("Something went wrong!")
      }
    }
  },[response])
  return (
    <div className="container my-3">
      <h2>Create New Job Post</h2>
      <form onSubmit={handleSubmit} ref={myform}>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="requirements" className="form-label">Requirements</label>
          <textarea
            className="form-control"
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
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

        <div className="mb-3">
          <label htmlFor="openings" className="form-label">Openings</label>
          <input
            type="number"
            className="form-control"
            id="openings"
            name="openings"
            value={formData.openings}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="income" className="form-label">Income</label>
          <input
            type="text"
            className="form-control"
            id="income"
            name="income"
            value={formData.income}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create Post</button>
      </form>
      <ToastContainer position="top-center"/>
    </div>
  );
}