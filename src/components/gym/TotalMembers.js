import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GymNav from './GymNav';
import Deleteicon from './img/deleteicon.svg';

export default function TotalMembers() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/purchase/packagesByGym',
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        }
      );
      setUsersData(response.data);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/purchase/deletemember/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        }
      );
      if (response.status === 200) {
        // Remove the deleted user from the usersData state
        setUsersData(usersData.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <GymNav />
      <div className="container mt-5 text-center">
        <h1 style={{ color: '#ff1100' }}>Users Data</h1>
        <table className="table table-hover table-dark mt-5">
          <thead>
            <tr>
              <th scope="col">
                <h3>ID</h3>
              </th>
              <th scope="col">
                <h3>Name</h3>
              </th>
              <th scope="col">
                <h3>Email</h3>
              </th>
              <th scope="col">
                <h3>Phone</h3>
              </th>
              <th scope="col">
                <h3>Address</h3>
              </th>
              <th scope="col">
                <h3>package</h3>
              </th>
              <th scope="col">
                <h3>Amount</h3>
              </th>
              <th scope="col">
                <h3>Joining Date</h3>
              </th>
              <th scope="col">
                <h3>Action</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.useremail}</td>
                <td>{user.userphone}</td>
                <td>{user.useraddress}</td>
                <td>{user.title}</td>
                <td>{user.amount}</td>
                <td>{user.purchaseDate}</td>
                <td>
                  <img
                    className="mx-3 my-auto"
                    style={{ cursor: 'pointer' }}
                    src={Deleteicon}
                    alt=""
                    onClick={() => handleDeleteUser(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
