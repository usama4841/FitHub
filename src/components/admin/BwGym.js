import React, { useEffect, useState } from 'react';
import logo from "./img/logo.svg";
import AdminNav from './AdminNav';
import edit from './img/edit.svg';
import deleteicon from './img/deleteicon.svg';

export default function BwGym() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [bgyms, setBGyms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedGym, setEditedGym] = useState({
    gymname: '',
    gymemail: '',
    gymphone: '',
    ownername: '',
    gymaddress: '',
    gymcity: ''
  });
  const [currentGym, setCurrentGym] = useState(null);

  const handleSubmit = async (e) => {
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/gym/gymsByDate?startDate=${fromDate}&endDate=${toDate}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const gymData = await response.json();
      setBGyms(gymData);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch data');
    } finally {
    }
  };

  const handleDeleteGym = async (gymId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/gym/deletegym/${gymId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete gym');
      }
      // Refresh gyms after deletion
      handleSubmit();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditGym = (gym) => {
    setCurrentGym(gym);
    setEditedGym({
      gymname: gym.gymname,
      gymemail: gym.gymemail,
      gymphone: gym.gymphone,
      ownername: gym.ownername,
      gymaddress: gym.gymaddress,
      gymcity: gym.gymcity
    });
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/gym/updategymfromadmin/${currentGym._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedGym)
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update gym');
      }
      setShowModal(false);
      // Refresh gyms after update
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
      <div className="container text-light px-5 pt-3 pb-2 mx-auto .bg-dark.bg-gradient" width="100%" style={{ borderRadius: "10px" }}>
        <div className="container">
          <h1 className="fw-semibold text-center" style={{ color: "#ff1100" }}>Gyms Registered Between Specific Dates</h1>
          <form className="row g-3 mx-2" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="col-6">
              <label htmlFor="fromDate" className="form-label">From</label>
              <input type="date" className="form-control" id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="col-6">
              <label htmlFor="toDate" className="form-label">To</label>
              <input type="date" id='toDate' className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <div className=" mt-4 d-grid gap-2">
              <button className="btn btn-outline-light fw-bold" style={{ textDecoration: "none", color: "#ff1100" }}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="container mt-5 text-center">
        <h3 style={{"color":"#ff1100"}}>Gyms Data</h3>
        <table className="table table-hover table-dark mt-3">
          <thead>
            <tr>
              <th scope="col"><h5>No</h5></th>
              <th scope="col"><h5>Name</h5></th>
              <th scope="col"><h5>Email</h5></th>
              <th scope="col"><h5>Owner Name</h5></th>
              <th scope="col"><h5>Phone No</h5></th>
              <th scope="col"><h5>Address</h5></th>
              <th scope="col"><h5>City</h5></th>
              <th scope="col"><h5>Action</h5></th>
            </tr>
          </thead>
          <tbody>
            {bgyms.map((bgym, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{bgym.gymname}</td>
                <td>{bgym.gymemail}</td>
                <td>{bgym.ownername}</td>
                <td>{bgym.gymphone}</td>
                <td>{bgym.gymaddress}</td>
                <td>{bgym.gymcity}</td>
                <td>
                  <img className="mx-3 my-auto" style={{cursor:"pointer"}} src={edit} alt="" onClick={() => handleEditGym(bgym)} />
                  <img className="mx-3 my-auto" style={{cursor:"pointer"}} src={deleteicon} alt="" onClick={() => handleDeleteGym(bgym._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Gym</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="gymname" className="form-label">Gym Name</label>
                    <input type="text" className="form-control" id="gymname" value={editedGym.gymname} onChange={(e) => setEditedGym({ ...editedGym, gymname: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gymemail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="gymemail" value={editedGym.gymemail} onChange={(e) => setEditedGym({ ...editedGym, gymemail: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gymphone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="gymphone" value={editedGym.gymphone} onChange={(e) => setEditedGym({ ...editedGym, gymphone: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ownername" className="form-label">Owner Name</label>
                    <input type="text" className="form-control" id="ownername" value={editedGym.ownername} onChange={(e) => setEditedGym({ ...editedGym, ownername: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gymaddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="gymaddress" value={editedGym.gymaddress} onChange={(e) => setEditedGym({ ...editedGym, gymaddress: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="zipcode" className="form-label">Zipcode</label>
                    <input type="text" className="form-control" id="zipcode" value={editedGym.zipcode} onChange={(e) => setEditedGym({ ...editedGym, zipcode: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gymcity" className="form-label">City</label>
                    <input type="text" className="form-control" id="gymcity" value={editedGym.gymcity} onChange={(e) => setEditedGym({ ...editedGym, gymcity: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gymstate" className="form-label">State</label>
                    <input type="text" className="form-control" id="gymstate" value={editedGym.gymstate} onChange={(e) => setEditedGym({ ...editedGym, gymstate: e.target.value })} />
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
