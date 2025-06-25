import { Fragment, useEffect, useState } from "react";
import Metadata from '../layouts/MetaData'
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword,clearAutherror } from "../../actions/userActions";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function ForgotPassword(){
    const dispatch=useDispatch();
    const [email,setEmail]=useState("");
    const {error,message}=useSelector(state=>state.authState);
    const onsubmithandler=(e)=>{
        e.preventDefault();
        const formdata =new FormData();
        formdata.append('email',email)
        dispatch(forgotPassword(formdata))
    }
    useEffect(()=>{
        if(message){
            toast(message,{
                type:'success',
                position:'bottom-center'
            })
            setEmail("");
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
    },[message,error,dispatch])
    return(
        <Fragment>
            <Metadata title={"Forgot Password"}/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={onsubmithandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e=> setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}