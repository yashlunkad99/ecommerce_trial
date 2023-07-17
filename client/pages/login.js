import React, { useState } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
// import {toast} from "react-toastify";
import { toast } from "react-hot-toast";
import { useAuth } from '../context/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const location =  useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
      if(res.data.success){
        toast.success(res.data.message);
        setAuth({
           ...auth,
           user :res.data.user,
           token:res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state || "/");
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
    <Layout title="Login - Ecommer App">
      <div className="login">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          
          
          <button type="submit" className="btn btn-primary">
              LOGIN
          </button>

          <div className="mb-3 pd-3">
          <button type="submit" className="btn btn-primary" onClick={()=>navigate('/forgot-password')}>
            Forgot Password
          </button>
          </div>
        </form>
      </div>
      </div>
    </Layout>
  );
};

export default Login;