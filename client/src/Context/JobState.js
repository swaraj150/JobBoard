import { createContext, useContext, useState } from "react";
import axios from "axios"

const JobContext = createContext();
export const JobProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const createJob = async (data) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")
      }
      const res = await axios.post("http://localhost:80/api/job/create", data, {
        headers: headers
      });
      setResponse(res.data)
      console.log("Job creation success", res.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setResponse(error.response.data);
        console.log("Job creation failed", error.response.data);
        console.error("Job creation failed with status code", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request", error.message);
      }
    }
  }
  const [jobList, setJobList] = useState(null);
  const getAllJob = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',

      }
      const res = await axios.get("http://localhost:80/api/job/getallpost", {
        headers: headers
      });
      setJobList({ response: res.data, success: true })
      console.log("Job retrieval success", res.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setJobList({ error: error.response.data, success: false });
        console.log("Job retrieval failed", { error: error.response.data, success: false });
        console.error("Job retrieval failed with status code", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request", error.message);
      }
    }
  }
  const [job, setJob] = useState(null);
  const getJob = async (id) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")
      }
      const res = await axios.get(`http://localhost:80/api/job/getpost/${id}`, {
        headers: headers
      });
      console.log("Job retrieval success", res.data);
      setJob({ response: res.data, success: true })
    } catch (error) {
      if (error.response) {
        setJob({ response: error.response.data, success: false });
        console.log("Job retrieval failed", error.response.data);
        console.error("Job retrieval failed with status code", error.response.status);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error setting up the request", error.message);
      }
    }
  }
  const [myuserJob, setMyUserJob] = useState(null);
  const getMyUserJob = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")
      }
      const res = await axios.get("http://localhost:80/api/job/getuserpost", {
        headers: headers
      });
      setMyUserJob({ response: res.data, success: true })
      // console.log("Job retrieval success", res.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setMyUserJob({ error: error.response.data, success: false });
        console.log("Job retrieval failed", { error: error.response.data, success: false });
        console.error("Job retrieval failed with status code", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request", error.message);
      }
    }
  }
  const [applySuccess, setApplySuccess] = useState(null);
  const apply = async (data) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")
      }
      const res = await axios.put("http://localhost:80/api/jobseeker/add-application", data, { headers: headers });
      console.log(res.data);
      if (res.data.success) setApplySuccess(true);
      else setApplySuccess(false)

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // setMyUserJob({error:error.response.data,success:false});
        setApplySuccess(false)
        console.log("application update failed", { error: error.response.data, success: false });
        console.error("application update failed with status code", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request", error.message);
      }
    }
  }
  const sendMail = async (data) => {
    try {
      const response = await axios.post('http://localhost:80/api/utility/send-mail', data)
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // setMyUserJob({error:error.response.data,success:false});
        console.log("mail transfer failed", { error: error.response.data, success: false });
        console.error("mail transfer failed with status code", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request", error.message);
      }
    }
  }
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

  const [searchResponse, setSearchResponse] = useState(null);
  const search = async (data) => {
    try {
      const { skills_required, companyName, industry, location, title } = data;
  
      const queryParams = {
        skills_required: skills_required ? skills_required : '',
        companyName: companyName ? companyName : '',
        industry: industry ? industry : '',
        location: location ? location : '',
        title: title !== undefined ? title : '' 
      };
  
      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => value !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
  
      const response = await axios.get(`http://localhost:80/api/job/search?${queryString}`);
      setSearchResponse(response.data);
      console.log("response application ", response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setSearchResponse({ error: error.response.data, success: false });
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
  };

  const [updateStatus, setUpdateStatus] = useState(null);
  const updateStatusfun = async (data) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")
      }
      const res = await axios.put("http://localhost:80/api/job/update-status", data, { headers: headers });
      console.log(res.data);
      if (res.data.success) setUpdateStatus(res.data);
      

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // setMyUserJob({error:error.response.data,success:false});
        setUpdateStatus(error.response)
        console.log("status update failed", { error: error.response.data, success: false });
        console.error("status update failed with status code", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request", error.message);
      }
    }
  };



  return (
    <JobContext.Provider value={{ response, createJob, jobList, getAllJob, job, getJob, myuserJob, getMyUserJob, apply, sendMail, getApplication, application, applySuccess,search,searchResponse,updateStatus,updateStatusfun }}>
      {children}
    </JobContext.Provider>
  );
};
export const useJob = () => {
  return useContext(JobContext);
};



