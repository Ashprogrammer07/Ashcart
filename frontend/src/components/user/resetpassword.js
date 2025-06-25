import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword ,clearAutherror} from "../../actions/userActions";

export default function ResetPassword(){
    const dispatch=useDispatch();
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmpassword]=useState("");
    const navigate=useNavigate();
    const {token}=useParams();
    const onsubmithandler=(e)=>{
            e.preventDefault();
            const formdata =new FormData();
            formdata.append('password',password)
            formdata.append('confirmPassword',confirmPassword)
           
            dispatch(resetPassword(formdata,token))
        }
        const {isauthenticated,error}=useSelector(state=>state.authState);
        useEffect(()=>{
            if(isauthenticated){
                navigate('/')
                        toast("Password Reset Successfull!!!",{
                            type:'success',
                            position:'bottom-center'
                        })
                        setPassword("");
                        setConfirmpassword("");
                        return;
                    }
                     if(error)  {
                                toast(error, {
                                    position: 'bottom-center',
                                    type: 'error',
                                    onOpen: ()=> { dispatch(clearAutherror) }
                                })
                                return
                            }
        },[dispatch,error,isauthenticated,navigate])
    return(
        <Fragment>
            <MetaData title={"Reset Password"}/>
            <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={onsubmithandler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={e=>setConfirmpassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>
        </Fragment>
    )
}