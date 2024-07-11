import { createContext, useContext, useState } from "react";
import axios from "axios"

const RegisterContext = createContext();
export const RegisterProvider=({children})=>{
    const [responseEmployer,setResponseEmployer]=useState(null);
    const BASE_URL=process.env.REACT_APP_BASE_URL || "http://localhost:80";
    const registerEmployerUser=async (data)=>{
        try {
            const res = await axios.post(`${BASE_URL}/api/employer/register`, data);
            setResponseEmployer(res.data)
            console.log("Registration success", res.data);
          } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setResponseEmployer(error.response.data);
                console.log("Registration failed", error.response.data);
                console.error("Registration failed with status code", error.response.status);
              } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from the server");
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up the request", error.message);
              }
          }
    

    }
    const [responseJobSeeker,setResponseJobSeeker]=useState(null);
    const registerJobSeekerUser=async (data)=>{
        try {
            const res = await axios.post(`${BASE_URL}/api/jobseeker/register`, data);
            setResponseJobSeeker(res.data)
            console.log("Registration success", res.data);
          } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setResponseJobSeeker(error.response.data);
                console.log("Registration failed", error.response.data);
                console.error("Registration failed with status code", error.response.status);
              } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from the server");
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up the request", error.message);
              }
          }
    

    }
    const [alert, setalert] = useState(null);
    const showalert = (message, type) => {
      console.log("alert: "+message)
      setalert({
        msg: message,
        type: type
      })
      setTimeout(() => {
        setalert(null);
      }, 3000)
  
    }
    // console.log("Current response value:", response)
    return (
        <RegisterContext.Provider value={{ responseEmployer,responseJobSeeker,registerEmployerUser,registerJobSeekerUser,alert,showalert}}>         {children}
        </RegisterContext.Provider>
      );
};
export const useRegister = () => {
    return useContext(RegisterContext);
};



