import React, { useState, useEffect } from 'react';
import { useJob } from '../Context/JobState';
import { Link } from 'react-router-dom';

const JobSearchPage = () => {
    const [preferences, setPreferences] = useState({
        skills_required: '',
        companyName: '',
        industry: '',
        location: '',
        title: ''
    });
    const { search, searchResponse } = useJob();

    const [selectedRadio, setSelectedRadio] = useState('skills_required');

    const handleSearch = async () => {
        await search(preferences);
    };

    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    };


    const openJobModal = (job) => {
        // Implement your modal logic here
        console.log('Open modal for job:', job);
    };

    const truncateDescription = (description, maxLength) => {
        return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
    };

    useEffect(() => {
        handleSearch(); // You may want to perform an initial search when the component mounts
    }, []); // Empty dependency array to run the effect only once

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Preferences Card */}
                <div className="card" style={{ width: "19rem", height: "20rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Preferences</h5>
                        {/* Radio buttons for different search criteria */}
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="searchCriteria"
                                value="skills_required"
                                checked={selectedRadio === 'skills_required'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                By Skills
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="searchCriteria"
                                value="companyName"
                                checked={selectedRadio === 'companyName'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                By Company Name
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="searchCriteria"
                                value="industry"
                                checked={selectedRadio === 'industry'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                By Industry
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="searchCriteria"
                                value="title"
                                checked={selectedRadio === 'title'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                By Title
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="searchCriteria"
                                value="location"
                                checked={selectedRadio === 'location'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                By Location
                            </label>
                        </div>
                        {/* Add similar form-checks for other search criteria */}
                    </div>
                </div>

                {/* Search Bar and Results */}
                <div className="col-md-9">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Search by ${selectedRadio}`}
                            value={preferences[selectedRadio]}
                            onChange={(e) => setPreferences({ ...preferences, [selectedRadio]: e.target.value })}
                        />
                        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                            Search
                        </button>
                    </div>



                    {searchResponse && searchResponse.success? (
                        <div className='d-flex justify-content-center'>
                            {searchResponse.jobs.length > 0 ? (
                                <div>
                                    {searchResponse.jobs.map((job) => (
                                        <div key={job._id} className="col-md-4 mb-3">
                                            <div className="card" style={{ width:"30rem", height:"15rem" }}>
                                                <div className="card-body d-flex flex-column justify-content-center align-items-center ">
                                                    <h5 className="card-title">{job.title}</h5>
                                                    <p className="card-text">{job.description} </p>
                                                    <Link to={`/jobseeker/job/${job._id}`} className="btn btn-primary" >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            ): (
                                <p>No posts found.</p>
                            )}
                        </div>
                    ) : (
                        <p>Search failed. Please try again later.</p>
                    )}
                
                </div>
            </div>
        </div>
    );
};

export default JobSearchPage;
