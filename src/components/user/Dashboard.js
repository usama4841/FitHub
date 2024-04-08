import React from 'react';
import UserNav from './UserNav';
import Home from './Home';

export default function GymDashboard() {
  return (
    <div>
      <UserNav />
      <div className="container my-4">
        <Home />
      </div>
    </div>
  );
}
