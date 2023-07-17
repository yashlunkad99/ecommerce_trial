import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Aboutus from './pages/aboutus';
import Contact from './pages/contact';
import PageNotFound from './pages/pageNotFound';
import  Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/user/dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateRoute from './components/routes/private_route';
import ForgotPassword from './pages/forgotPassword';
import AdminPrivateRoute from './components/routes/adminRoute';
import 'bootstrap/dist/css/bootstrap.css';
import CreateCategory from './pages/admin/createCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Orders from './pages/user/orders';
import Profile from './pages/user/profile';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/admin/AdminOrders';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search/>} />
        <Route path='/products/:slug' element={<ProductDetails/>} />
        <Route path='/categories' element={<Categories/>} /> 
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/category/:slug' element={<CategoryProduct/>} />
        <Route path='/dashboard' element={<PrivateRoute />} >
           <Route path="user" element={<Dashboard />} />
           <Route path = 'user/orders' element = {<Orders/>} />
           <Route path = 'user/profile' element = {<Profile/>} />
        </Route>

        <Route path='/dashboard' element = {<AdminPrivateRoute/>}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        
        <Route path='/about' element={<Aboutus />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
    
  );
}

export default App;
