import React, { useState, useEffect } from "react";
import GymNav from './GymNav';
import editIcon from './img/edit.svg';
import deleteIcon from './img/deleteicon.svg';

export default function GymPackages() {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedPackage, setEditedPackage] = useState({
    _id: '',
    title: '',
    description: '',
    amount: '',
    image: null // Initialize image as null
  });

  const handleDeletePackage = async (packageId, imageName) => { // Pass imageName as argument
    try {
        const response = await fetch(
            `http://localhost:5000/api/package/deletepackages/${packageId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }
        );
        if (!response.ok) {
            throw new Error('Failed to delete package');
        }

        // Delete the image from the uploads folder
        await fetch(`http://localhost:5000/api/package/deleteimage/${imageName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        fetchPackages();
    } catch (error) {
        console.error('Error:', error);
    }
};



  const handleEditPackage = (pkg) => {
    setEditedPackage(pkg);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData(); // Create FormData object
      formData.append('title', editedPackage.title);
      formData.append('description', editedPackage.description);
      formData.append('amount', editedPackage.amount);
      formData.append('image', editedPackage.image); // Append image file

      const response = await fetch(
        `http://localhost:5000/api/package/updatepackage/${editedPackage._id}`,
        {
          method: 'PUT',
          body: formData // Use FormData object as body
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update package');
      }
      setShowModal(false);
      // Refresh packages after update
      fetchPackages();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/package/fetchpackages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div>
      <GymNav />
      <div className="container mt-5 text-center">
        <h1 style={{ color: "#ff1100" }}>Gym Packages</h1>
        <div className="table-responsive">
          <table className="table table-hover table-dark mt-5">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Amount</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {packages.map((pkg, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pkg.title}</td>
                  <td style={{ maxWidth: "30vw" }}>{pkg.description}</td>
                  <td>{pkg.amount}</td>
                  <td>{pkg.image}</td>
                  <td>
                    <img src={editIcon} style={{ cursor: "pointer" }} alt="Edit" onClick={() => handleEditPackage(pkg)} className="mx-3 my-auto" />
                    <img src={deleteIcon} style={{ cursor: "pointer" }} alt="Delete" onClick={() => handleDeletePackage(pkg._id, pkg.image)} className="mx-3 my-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Package</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={editedPackage.title} onChange={(e) => setEditedPackage({ ...editedPackage, title: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={editedPackage.description} onChange={(e) => setEditedPackage({ ...editedPackage, description: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" value={editedPackage.amount} onChange={(e) => setEditedPackage({ ...editedPackage, amount: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" className="form-control" id="image" onChange={(e) => setEditedPackage({ ...editedPackage, image: e.target.files[0] })} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
