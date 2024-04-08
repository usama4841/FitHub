import React, { useState, useEffect } from "react";
import GymNav from './GymNav';
import editIcon from './img/edit.svg';
import deleteIcon from './img/deleteicon.svg';

export default function GymTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedTrainer, setEditedTrainer] = useState({
    trainername: '',
    traineremail: '',
    trainernumber: '',
    traineraddress: '',
    clients: ''
  });

  const handleDeleteTrainer = async (trainerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/trainer/deletetrainer/${trainerId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete trainer');
      }
      fetchTrainers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/trainer/fetchtrainers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleEditTrainer = (trainer) => {
    setEditedTrainer(trainer);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/trainer/updatetrainer/${editedTrainer._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedTrainer)
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update trainer');
      }
      setShowModal(false);
      // Refresh trainers after update
      fetchTrainers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div>
      <GymNav />
      <div className="container mt-5 text-center">
        <h1 style={{ color: "#ff1100" }}>Gym Trainers</h1>
        <div className="table-responsive">
          <table className="table table-hover table-dark mt-5">
            <thead>
              <tr>
                <th scope="col">Trainer Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Address</th>
                <th scope="col">No of Clients</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer, index) => (
                <tr key={index}>
                  <td>{trainer.trainername}</td>
                  <td>{trainer.traineremail}</td>
                  <td>{trainer.trainernumber}</td>
                  <td>{trainer.traineraddress}</td>
                  <td>{trainer.clients}</td>
                  <td>
                    <img src={editIcon} style={{cursor:"pointer"}} alt="Edit" onClick={() => handleEditTrainer(trainer)} className="mx-3 my-auto" />
                    <img src={deleteIcon} style={{cursor:"pointer"}} alt="Delete" onClick={() => handleDeleteTrainer(trainer._id)} className="mx-3 my-auto" />
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
                <h5 className="modal-title">Edit Trainer</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="trainername" className="form-label">Trainer Name</label>
                    <input type="text" className="form-control" id="trainername" value={editedTrainer.trainername} onChange={(e) => setEditedTrainer({ ...editedTrainer, trainername: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="traineremail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="traineremail" value={editedTrainer.traineremail} onChange={(e) => setEditedTrainer({ ...editedTrainer, traineremail: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="trainernumber" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" id="trainernumber" value={editedTrainer.trainernumber} onChange={(e) => setEditedTrainer({ ...editedTrainer, trainernumber: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="traineraddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="traineraddress" value={editedTrainer.traineraddress} onChange={(e) => setEditedTrainer({ ...editedTrainer, traineraddress: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="clients" className="form-label">Number of Clients</label>
                    <input type="number" className="form-control" id="clients" value={editedTrainer.clients} onChange={(e) => setEditedTrainer({ ...editedTrainer, clients: e.target.value })} />
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
