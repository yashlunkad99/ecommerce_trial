import React from 'react';
import { Link } from 'react-router-dom';

const footer = () => {
  return (
    <div  className='footer'>
      <h2 className='text-center '>All Rights Reserved &copy;</h2>
      <p className='text-center mt-3'>
          <Link to="/about">About Us</Link> |  <Link to="/contact">Contact</Link>
      
      </p>
    </div>
  );
};

export default footer;