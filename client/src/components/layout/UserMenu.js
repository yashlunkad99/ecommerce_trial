import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const UserMenu = () => {
  return (
    <div className='text-center m-3 p-3' >
      <div className="list-group">
        <h4>User Panel</h4>
        <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
        <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Your Orders</NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
