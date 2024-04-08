import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import edit from './img/edit.svg';
import deleteicon from './img/deleteicon.svg';

export default function TotalGyms() {
  const [gyms, setGyms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedGym, setEditedGym] = useState({
    gymname: '',
    gymemail: '',
    gymphone: '',
    ownername: '',
    gymaddress: '',
    zipcode: '',
    gymcity: '',
    gymstate: ''
  });

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
      getallGyms();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getallGyms = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/gym/allgyms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setGyms(json);
    } catch (error) {
      console.error("Error fetching gyms:", error);
    }
  };

  const handleEditGym = (gym) => {
    setEditedGym(gym);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/gym/updategymfromadmin/${editedGym._id}`,
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
      getallGyms();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getallGyms();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="container mt-5 text-center">
        <h1 style={{ color: "#ff1100" }}>Gyms Data</h1>
        <div className="table-responsive">
          <table className="table table-hover table-dark mt-5">
            <thead>
              <tr>
                <th scope="col">
                  <h5>NO</h5>
                </th>
                <th scope="col">
                  <h5>Gym Name</h5>
                </th>
                <th scope="col">
                  <h5>Email</h5>
                </th>
                <th scope="col">
                  <h5>Phone No</h5>
                </th>
                <th scope="col">
                  <h5>Owner Name</h5>
                </th>
                <th scope="col">
                  <h5>Address</h5>
                </th>
                <th scope="col">
                  <h5>City</h5>
                </th>
                <th scope="col">
                  <h5>State</h5>
                </th>
                <th scope="col">
                  <h5>Action</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {gyms.map((gym, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{gym.gymname}</td>
                  <td>{gym.gymemail}</td>
                  <td>{gym.gymphone}</td>
                  <td>{gym.ownername}</td>
                  <td>{gym.gymaddress}</td>
                  <td>{gym.gymcity}</td>
                  <td>{gym.gymstate}</td>
                  <td>
                    <img className="mx-3 my-auto" style={{cursor:"pointer"}} src={edit} alt="" onClick={() => handleEditGym(gym)} />
                    <img className="mx-3 my-auto" style={{cursor:"pointer"}} src={deleteicon} alt="" onClick={() => handleDeleteGym(gym._id)} />
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
    </div>
  );
}
