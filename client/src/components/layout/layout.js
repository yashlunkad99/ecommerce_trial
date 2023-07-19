import React from 'react';
import Header from './header';
import Footer from './footer';
import {Helmet} from 'react-helmet';
// import { ToastContainer } from "react-toastify";
import {Toaster} from  'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

const layout = ({children, title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
         <meta name="description" content={description} />
         <meta name="keywords" content={keywords} />
         <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header></Header>
      <main style={{minHeight:"80vh" }}>
      {/* <ToastContainer /> */}
      <Toaster />
        {children}
      </main>
        
      <Footer></Footer>
    </div>
    
  );
};

export default layout;