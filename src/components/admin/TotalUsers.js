import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import edit from './img/edit.svg';
import deleteicon from './img/deleteicon.svg';

export default function TotalUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    city: '',
    state: ''
  });

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/deleteuser/${userId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      getallUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getallUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/allusers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditedUser(user);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/updateuserfromadminside/${editedUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedUser)
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      setShowModal(false);
      // Refresh users after update
      getallUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getallUsers();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="container mt-5 text-center">
        <h1 style={{ color: "#ff1100" }}>Users Data</h1>
        <div className="table-responsive">
          <table className="table table-hover table-dark mt-5">
            <thead>
              <tr>
                <th scope="col">
                  <h5>NO</h5>
                </th>
                <th scope="col">
                  <h5>Name</h5>
                </th>
                <th scope="col">
                  <h5>Email</h5>
                </th>
                <th scope="col">
                  <h5>Phone No</h5>
                </th>
                <th scope="col">
                  <h5>Age</h5>
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
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.age}</td>
                  <td>{user.address}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>
                    <img className="mx-3 my-auto" src={edit} alt="" onClick={() => handleEditUser(user)} />
                    <img className="mx-3 my-auto" src={deleteicon} alt="" onClick={() => handleDeleteUser(user._id)} />
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
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={editedUser.name} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" value={editedUser.phone} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" value={editedUser.age} onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={editedUser.address} onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" value={editedUser.city} onChange={(e) => setEditedUser({ ...editedUser, city: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input type="text" className="form-control" id="state" value={editedUser.state} onChange={(e) => setEditedUser({ ...editedUser, state: e.target.value })} />
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
