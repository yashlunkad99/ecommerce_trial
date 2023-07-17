import React from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/layout';
import 'bootstrap/dist/css/bootstrap.css';

const AdminUser = () => {
  return (
    <>
       <Layout title={"Users - E-Commerece App"}>
         <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1>All Users</h1>
            </div>
         </div>
       </Layout>
    </>
    
  );
};

export default AdminUser;