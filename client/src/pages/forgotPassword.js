import React, { useState } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
// import {toast} from "react-toastify";
import { toast } from "react-hot-toast";
import { useAuth } from '../context/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
  
    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,answer,newPassword});
        if(res.data.success){
          toast.success(res.data.message);
          navigate("/login");
        }
        else
        {
          toast.error(res.data.message);
        }
        
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
  
    };
  return (
    <Layout title={"Forgot Password - E-Commerce App"}>
        <div className="forgot-password">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">Reset Password</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Answer"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          
          
          <button type="submit" className="btn btn-primary">
              Reset Password
          </button>

          
        </form>
      </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword;