
import React from 'react';
import Search from '../product/search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {DropdownButton,Dropdown,Image} from 'react-bootstrap';
import { logout } from '../../actions/userActions';
export default function Header() {
  const{items:cartItems}=useSelector(state=>state.cartState);
  const {isauthenticated,user}=useSelector(state=>state.authState);
  const dispatch=useDispatch();
  const logoutHandler=() => {
    dispatch(logout);
  }
  const navigate=useNavigate();
    return(
    
         <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand" >
      <Link  to='/'>
          <img width="150px"  src="/images/logo.png" alt='Logo'/>
        </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
      <Search/>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isauthenticated?(
          <Dropdown className='d-inline'>
            <Dropdown.Toggle id='dropdown-basic' variant='default text-white pr-5'>
              <figure className='avatar avatar-nav'>
                <Image  width='50px' style={{borderRadius: '50%'}} src={user.avatar??'./images/default_avatar.png'}/>
              </figure>
              <span>{user.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>{user.role==='admin'?<Dropdown.Item  onClick={()=> navigate('/admin/dashboard')}>Dashboard</Dropdown.Item>:null}
               
              <Dropdown.Item  onClick={()=> navigate('/myprofile')}>My Profile</Dropdown.Item>
              <Dropdown.Item  onClick={()=>navigate('/myorders')}>My Orders</Dropdown.Item>
              <Dropdown.Item className='text-danger' onClick={logoutHandler}>Logout</Dropdown.Item>
              
            </Dropdown.Menu>
          </Dropdown>
        ):
        <Link to='/login' className="btn" id="login_btn">Login</Link>}

        <Link to='/cart'><span id="cart" className="ml-3">{cartItems.length}</span></Link>
        <span className="ml-1" id="cart_count"></span>
      </div>
    </nav>
        
    )
}