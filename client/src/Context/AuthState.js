import { createContext, useContext, useState } from "react";
import axios from "axios"

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [responseEmployer, setResponseEmployer] = useState(null);
  const checkEmployerAuth = async (credToCheck) => {
    try {
      const res = await axios.post("http://localhost:80/api/employer/login", credToCheck);
      setResponseEmployer(res.data)
      // if(res.data.success){
      //   localStorage.setItem("user","EMPLOYER");
      // }
      console.log("Authentication success", res.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setResponseEmployer(error.response.data);
        console.log("Authentication failed", error.response.data);
        console.error("Authentication failed with status code", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request", error.message);
      }
    }
  }
  const [responseJobSeeker, setResponseJobSeeker] = useState(null);
  const checkJobSeekerAuth = async (credToCheck) => {
    try {
      const res = await axios.post("http://localhost:80/api/jobseeker/login", credToCheck);
      setResponseJobSeeker(res.data)
      // if(res.data.success){
      //   localStorage.setItem("user","JOBSEEKER");
      // }
      console.log("Authentication success", res.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setResponseJobSeeker(error.response.data);
        console.log("Authentication failed", error.response.data);
        console.error("Authentication failed with status code", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request", error.message);
      }
    }
  }


  const [userEmployer, setUserEmployer] = useState({});

  const getUserEmployer = async () => {
    try {
      const response = await fetch('http://localhost:80/api/employer/getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      if (response.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access');
        setUserEmployer(null);
        return;
      }
      const json = await response.json();
      setUserEmployer(json);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserEmployer(null);
    }
  };
  const [userJobSeeker, setUserJobSeeker] = useState({});
  const getUserJobSeeker = async () => {
    try {
      const response = await fetch('http://localhost:80/api/jobseeker/getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      if (response.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access');
        setUserJobSeeker(null);
        return;
      }
      const json = await response.json();
      setUserJobSeeker(json);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserJobSeeker(null);
    }
  };

  const [employer, setEmployer] = useState(null);
  const getEmployerById = async (id) => {
    try {
      console.log("entered in fetchEmployer")
      const response = await fetch(`http://localhost:80/api/employer/getuser/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      if (response.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access');
        setEmployer(null);
        return;
      }
      const json = await response.json();
      setEmployer(json);
      console.log(json)
    } catch (error) {
      console.error('Error fetching user data:', error);
      setEmployer(null);
    }
  }

  const [role, setRole] = useState(null);
  const fetchRole = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")
      }
      const response = await axios.get("http://localhost:80/api/utility/getrole", { headers: headers });
      if (response.data.success) {
        setRole(response.data);
      }
    } catch (e) {
      console.error('Error fetching user data:', e);
      setEmployer(null);
    }
  }
  return (
    <AuthContext.Provider value={{ responseEmployer, responseJobSeeker, checkEmployerAuth, checkJobSeekerAuth, userEmployer, getUserEmployer, userJobSeeker, getUserJobSeeker, employer, getEmployerById, role,fetchRole}}>
      {children}
    </AuthContext.Provider>
  );
}
// console.log("Current response value:", response)
export const useAuth = () => {
  return useContext(AuthContext);
};



