import React , {useEffect,useState} from 'react';
import { useAuth } from '../../context/auth';
import Layout from '../../components/layout/layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import UserMenu from '../../components/layout/UserMenu';

const Profile = () => {
  const [auth,setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(()=>{
    const {email,name,phone,address,password}=auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    setPassword(password);
  },[auth?.user])

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{name,email,address,phone});
      if(data?.error)
      {
        toast.error(data?.error);

      }
      else{
        setAuth({...auth,user:data?.updatedUser});
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user=data.updatedUser;
        localStorage.setItem('auth',JSON.stringify(ls));
        toast.success("Profile update successfully");
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

  };
    
  return (
    <>
      <Layout>
        <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">USER PROFILE</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
            
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              disabled
            />
          </div>
          
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              
            />
          </div>

          
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
        </form>
      </div>
                </div>
            </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;