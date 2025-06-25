import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword,clearAutherror } from "../../actions/userActions";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function UpdatePassword(){

    const [password,setPassword]=useState("");
    const [oldpassword,setOldpassword]=useState("");
    const dispatch= useDispatch();
    const onsubmithandler = (e) => {
    e.preventDefault();
    const passwordData = {
        oldPassword: oldpassword,
        password: password
    };
    dispatch(updatePassword(passwordData));
};


    const {isupdated,error}=useSelector(state=>state.authState);
    useEffect(()=>{
        if(isupdated) {
                    toast('Password updated successfully',{
                        type: 'success',
                        position: 'bottom-center',
                        
                    })
                    setOldpassword("");
                    setPassword("");
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
    },[isupdated,error,dispatch])

    return(
        <Fragment>
            <MetaData title={"Change Password"}/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={onsubmithandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldpassword}
                                onChange={e=>setOldpassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={e=> setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}