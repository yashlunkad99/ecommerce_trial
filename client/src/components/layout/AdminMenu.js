import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const AdminMenu = () => {
  return (
    <div className='text-center m-3 p-3' >
      <div className="list-group">
        <h4>Admin Panel</h4>
        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">View Products</NavLink>
        <NavLink to="/dashboard/admin/create-user" className="list-group-item list-group-item-action">Users</NavLink>
        <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Orders</NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
