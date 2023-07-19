import React from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/layout';

import { useAuth } from '../../context/auth';
import 'bootstrap/dist/css/bootstrap.css';
const AdminDashboard = () => {
    const [auth] = useAuth();
  return (
    <>
    <Layout title={"Admin- E-Commerce App"}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                      <h3>Admin Name: {auth?.user?.name}</h3> 
                      <h3>Admin Email: {auth?.user?.email}</h3> 
                      <h3>Admin Phone: {auth?.user?.phone}</h3> 
                    </div>
                </div>
            </div>
        </div>
   </Layout>
   </>
    
  );
};

export default AdminDashboard;