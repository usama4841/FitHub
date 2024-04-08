import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import edit from './img/edit.svg';
import deleteicon from './img/deleteicon.svg';

export default function BwUser() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [busers, setBUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  const [currentUserIndex, setCurrentUserIndex] = useState(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/usersByDate?startDate=${fromDate}&endDate=${toDate}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const userData = await response.json();
      setBUsers(userData);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (index, user) => {
    setCurrentUserIndex(index);
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
      handleSubmit();
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      // Refresh users after deletion
      handleSubmit();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="container text-light px-5 pt-3 pb-1 mx-auto .bg-dark.bg-gradient" width="100%" style={{ borderRadius: '10px' }}>
        <div className="container">
          <h1 className="fw-semibold text-center" style={{ color: '#ff1100' }}>
            Users Registered Between Specific Dates
          </h1>
          <form className="row g-3 mx-3 mt-1" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="col-6">
              <label htmlFor="fromDate" className="form-label">
                From
              </label>
              <input type="date" className="form-control" id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="col-6">
              <label htmlFor="toDate" className="form-label">
                To
              </label>
              <input type="date" className="form-control" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <div className=" mt-5 d-grid gap-2">
              <button className="btn btn-outline-light fw-bold" style={{ textDecoration: 'none', color: '#ff1100' }} disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container mt-4 my-auto text-center align-middle">
        <h3 style={{ color: '#ff1100' }}>Users</h3>
        <div className="table-responsive">
          <table className="table table-hover table-dark mt-5">
            <thead>
              <tr>
                <th scope="col">
                  <h5>No</h5>
                </th>
                <th scope="col">
                  <h5>Name</h5>
                </th>
                <th scope="col">
                  <h5>Email</h5>
                </th>
                <th scope="col">
                  <h5>Joining Date</h5>
                </th>
                <th scope="col">
                  <h5>Phone No</h5>
                </th>
                <th scope="col">
                  <h5>Address</h5>
                </th>
                <th scope="col">
                  <h5>City</h5>
                </th>
                <th scope="col">
                  <h5>Action</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {busers.map((buser, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{buser.name}</td>
                  <td>{buser.email}</td>
                  <td>{buser.joiningDate}</td>
                  <td>{buser.phone}</td>
                  <td>{buser.address}</td>
                  <td>{buser.city}</td>
                  <td>
                    <img className="mx-3 my-auto" src={edit} alt="" onClick={() => handleEditUser(index, buser)} />
                    <img className="mx-3 my-auto" src={deleteicon} alt="" onClick={() => handleDeleteUser(buser._id)} />
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
