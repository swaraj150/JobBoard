import './App.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './Context/AuthState';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RegisterProvider } from './Context/RegisterState';
import { JobProvider } from './Context/JobState';
import HomeEmployer from './components/HomeEmployer';
import Home from './components/Home';
import RegisterEmployer from './components/RegisterEmployer';
import Register from './components/Register';
import LoginEmployer from './components/LoginEmployer';
import Login from './components/Login';
import Job from './components/Job';
import JobSeekerApplications from './components/JobSeekerApplications';
function App() {
  // window.addEventListener('beforeunload', function(event) {
  //   localStorage.clear();
  // });
  return (
    <>
    <RegisterProvider>
      <AuthProvider>
        <JobProvider>

        <BrowserRouter>
        <Navbar title="Job Board" aboutText="About us"  />
        <div className="container">
            <Routes>
              <Route  exact path="/employer" element={<HomeEmployer/>}/>
              <Route  exact path="/jobseeker" element={<Home/>}/>
              <Route exact path="/employer/register" element={<RegisterEmployer/>} /> 
              <Route exact path="/jobseeker/register" element={<Register/>} /> 
              <Route exact path="/employer/login" element={<LoginEmployer />} /> 
              <Route exact path="/jobseeker/login" element={<Login />} /> 
              <Route exact path="/jobseeker/job/:id" element={<Job />} />  
              <Route exact path="/jobseeker/applications" element={<JobSeekerApplications />} />  

            </Routes>
          </div>
          </BrowserRouter>
        </JobProvider>
      </AuthProvider>
    </RegisterProvider>
    </>
  );
}

export default App;