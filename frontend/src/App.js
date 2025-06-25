import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/footer';
import Header from './components/layouts/Header';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {ToastContainer} from "react-toastify";
import Details from './components/product/productDetails';
import ProductSearch from './components/product/productSearch';
import Login from './components/user/login';
import Register from './components/user/register';
import { useEffect, useState } from 'react';
import store from "./store";
import { loaduser } from './actions/userActions';
import Profile from './components/user/profile';
import ProtectedRoute from './components/route/protectedRoute';
import UpdateProfile from './components/user/updateprofile';
import UpdatePassword from './components/user/updatepassword';
import ForgotPassword from './components/user/forgotpassword';
import ResetPassword from './components/user/resetpassword';
import Cart from './components/cart/cart';
import ShippingInfO from './components/cart/shipping';
import ConfirmOrder from './components/cart/confirmorder';
import Payment from './components/cart/payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios';
import OrderSuccess from './components/cart/ordersuccess';
import UserOrder from './order/userOrder';
import OrderDetail from './order/orderDetail';
import Dashboard from './components/admin/dashboard';
import PorductList from './components/admin/productList';
import NewProduct from './components/admin/newproduct';
import UpdateProduct from './components/admin/updateproduct';
import OrderList from './components/admin/orderList';
import UpdateOrder from './components/admin/updateorder';
import UserList from './components/admin/userList';
import UpdateUser from './components/admin/updatuser';
import ReviewList from './components/admin/reviewslist';
function App() {
 const [stripeapiKey,setStripeApiKey]=useState("");
 useEffect(()=>{
 
  store.dispatch(loaduser)
  async function getstripeapikey() {
    const {data}= await axios.get('/api/v1/stripeapi')
    setStripeApiKey(data.stripeApiKey)
  }
  getstripeapikey();
 },[])
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header/>
          <div className='container container-fluid'>
          <ToastContainer theme='dark'/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/products/:id' element={<Details/>}/>
              <Route path='/search/:keyword' element={<ProductSearch/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
              <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
              <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
              <Route path='/password/forgot' element={<ForgotPassword/>}/>
              <Route path='/password/reset/:token' element={<ResetPassword/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/shipping' element={<ProtectedRoute><ShippingInfO/></ProtectedRoute>}/>
              <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
              {stripeapiKey&&
              <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeapiKey)}><Payment/></Elements></ProtectedRoute>}/>}
              <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
              <Route path='/myorders' element={<UserOrder/>}/>
              <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute>}/>
              
            </Routes>
            
            </div>
            <Routes>
              <Route path='/admin/dashboard' element={<ProtectedRoute isadmin={true}><Dashboard/></ProtectedRoute>}/>
              <Route path='/admin/products' element={<ProtectedRoute isadmin={true}><PorductList/></ProtectedRoute>}/>
              <Route path='/admin/products/new' element={<ProtectedRoute isadmin={true}><NewProduct/></ProtectedRoute>}/>
              <Route path='/admin/products/:id' element={<ProtectedRoute isadmin={true}><UpdateProduct/></ProtectedRoute>}/>
              <Route path='/admin/orders' element={<ProtectedRoute isadmin={true}><OrderList/></ProtectedRoute>}/>
              <Route path='/admin/order/:id' element={<ProtectedRoute isadmin={true}><UpdateOrder/></ProtectedRoute>}/>
              <Route path='/admin/users' element={<ProtectedRoute isadmin={true}><UserList/></ProtectedRoute>}/>
              <Route path='/admin/user/:id' element={<ProtectedRoute isadmin={true}><UpdateUser/></ProtectedRoute>}/>
              <Route path='/admin/reviews' element={<ProtectedRoute isadmin={true}><ReviewList/></ProtectedRoute>}/>
            </Routes>
          <Footer/>
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;