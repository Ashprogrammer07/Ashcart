import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { useState } from "react";
import { clearAutherror, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
export default  function Login(){
     const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");
      const dispatch= useDispatch();
      const location=useLocation();
      const {loading,error,isauthenticated}=useSelector(state=>state.authState);
      const navigate= useNavigate();
      const queryParams = new URLSearchParams(location.search);
const redirect = queryParams.get("redirect") ? `/${queryParams.get("redirect")}` : "/";
      const submithandler=(e)=>{
        e.preventDefault();
    dispatch(login(email,password))}
    useEffect(()=>{
      if(isauthenticated){
        navigate(redirect)
      }
      if(error){
          toast(error,{
            position: 'bottom-center',
            type: 'error',
            onOpen: ()=>{dispatch(clearAutherror)}
          })
          return
      }
    },[error,isauthenticated,dispatch,navigate])
      
    return(
        <Fragment>
            <MetaData title={"Login"}/>
          <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submithandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e=> setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={e=> setPassword(e.target.value)}
              />
            </div>

            <Link to='/password/forgot' className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              LOGIN
            </button>

            <Link to='/register' className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
    </Fragment>
    )
}