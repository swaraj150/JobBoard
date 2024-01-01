import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function HomeEmployer() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const createPost = () => {
    // Add logic to handle creating a new job post
    // You can use a form inside the modal and make an API call to create a post
    console.log("Creating a new job post...");
    // Implement your create post logic here
    closeModal();
  };

  return (
    <div>
      <h1>Welcome, Employer!</h1>
      <p>Explore talented candidates and find the perfect fit for your team.</p>

      <div>
        <button onClick={openModal} className="btn btn-primary">Create New Job Post</button>
      </div>

      {/* Modal for creating a new job post */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Create New Job Post</h2>
            {/* Add your form for creating a new job post here */}
            <button onClick={createPost} className="btn btn-success">Create Post</button>
          </div>
        </div>
      )}
    </div>
  );
}
