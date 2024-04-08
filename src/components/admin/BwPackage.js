import React, { useEffect, useState } from 'react';
import logo from "./img/logo.svg";
import AdminNav from './AdminNav';
import edit from './img/edit.svg';
import deleteicon from './img/deleteicon.svg'

export default function BwPackage() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [bpackages, setBPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [editedPackage, setEditedPackage] = useState({
    title: '',
    description: '',
    amount: ''
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/package/packagesByDate?startDate=${fromDate}&endDate=${toDate}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const packageData = await response.json();
      setBPackages(packageData);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePackage = async (packageId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/package/deletepackagefromadmin/${packageId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete package');
      }
      // Refresh packages after deletion
      handleSubmit();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditPackage = (packageData) => {
    setCurrentPackage(packageData);
    setEditedPackage({
      title: packageData.title,
      description: packageData.description,
      amount: packageData.amount
    });
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/package/updatepackage/${currentPackage._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedPackage)
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update package');
      }
      setShowModal(false);
      // Refresh packages after update
      handleSubmit();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleSubmit();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <AdminNav/>
      <div
        className="container text-light px-5 pt-5 pb-2 mx-auto .bg-dark.bg-gradient"
        width="100%"
        style={{ borderRadius: "10px" }}
      >
        <div className="container">
          <h1
            className="fw-semibold text-center"
            style={{ color: "#ff1100" }}
          >
            Packages Uploaded Between Specific Dates 
          </h1>
          <form className="row g-3 mx-2" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="col-6">
              <label htmlFor="fromDate" className="form-label">
                From
              </label>
              <input
                type="date"
                className="form-control"
                id="fromDate"
                value={fromDate} 
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label htmlFor="toDate" className="form-label">
                To
              </label>
              <input
                type="date"
                className="form-control"
                id='toDate'
                value={toDate} 
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className=" mt-5 d-grid gap-2">
              <button className="btn btn-outline-light fw-bold" style={{ textDecoration: "none", color: "#ff1100" }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container mt-5 text-center">
        <h3 style={{"color":"#ff1100"}}>Packages Data</h3>
        <table className="table table-hover table-dark mt-5">
          <thead>
            <tr>
              <th scope="col"><h5>No</h5></th>
              <th scope="col"><h5>Gym</h5></th>
              <th scope="col"><h5>Title</h5></th>
              <th scope="col"><h5>Description</h5></th>
              <th scope="col"><h5>Amount</h5></th>
              <th scope="col"><h5>Action</h5></th>
            </tr>
          </thead>
          <tbody>
            {bpackages.map((bpackage, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{bpackage.gymname}</td>
                <td>{bpackage.title}</td>
                <td>{bpackage.description}</td>
                <td>{bpackage.amount}</td>
                <td style={{cursor:'pointer'}}>
                  <img className="mx-3 my-auto" src={edit} alt="" onClick={() => handleEditPackage(bpackage)} />
                  <img className="mx-3 my-auto" src={deleteicon} alt="" onClick={() => handleDeletePackage(bpackage._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && currentPackage && (
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
                    <input type="text" className="form-control" id="title" defaultValue={currentPackage.title} onChange={(e) => setEditedPackage({ ...editedPackage, title: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" defaultValue={currentPackage.description} onChange={(e) => setEditedPackage({ ...editedPackage, description: e.target.value })}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" defaultValue={currentPackage.amount} onChange={(e) => setEditedPackage({ ...editedPackage, amount: e.target.value })} />
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
      <div className="d-flex justify-content-center my-5 mb-5">
        <img className="mx-4" src={logo} alt="" width="72" height="30" />
        <p className="mx-4 my-auto text-light h6">© 2024 FitHub, Inc</p>
      </div>
    </div>
  )
}
