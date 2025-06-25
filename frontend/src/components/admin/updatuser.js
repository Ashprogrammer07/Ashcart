import { Fragment } from "react/jsx-runtime";
import MetaData from '../layouts/MetaData';
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from '../layouts/loader';
import { GetUser, updateUser } from "../../actions/adminuserActions";
import { clearupdateerror, clearUserError } from "../../slices/userSlices";



export default function UpdateUser() {
  const{loading,isuserupdated,error,user={}}=useSelector(state=>state.userState);
  const{user:authuser={}}=useSelector(state=>state.authState);
  
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [role,setrole]=useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const formdata= new FormData();
    formdata.append('name',name);
    formdata.append('email',email);
    formdata.append('role',role);
    dispatch(updateUser(id,formdata ));
  };

  useEffect(() => {
    if (isuserupdated) {
      toast.success("User Updated Successfully", {
        position: 'bottom-center',
        onOpen: () => dispatch(clearupdateerror())
      });
    }

    if (error) {
      toast.error(error, {
        position: 'bottom-center',
        onOpen: () => dispatch(clearUserError())
      });
    }

    dispatch(GetUser(id));
  }, [dispatch, error, isuserupdated, id]);

  useEffect(()=>{
    if(user._id){
        setname(user.name);
        setemail(user.email);
        setrole(user.role);
    }
  },[user])

  

  if (!user) return <Loader />;

  return (
    <div className="row">
      <MetaData title={"Update User"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>

      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5"> 
        <form className="shadow-lg" encType='multipart/form-data'onSubmit={onsubmitHandler}>
            <h1 className="mb-4">Update User</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e)=>setname(e.target.value)}
              />
            </div>

            <div className="form-group">
                <label htmlFor="price_field">Email</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                />
              </div>

              

              <div className="form-group">
                <label htmlFor="category_field">Role</label>
                <select disabled={user._id===authuser._id} className="form-control" id="category_field" onChange={(e)=>setrole(e.target.value)} value={role}>
                    <option value=''>Select</option>
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
                  </select>
              </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
          
            >
              UPDATE USER
            </button>

          </form>
 </div>
        </Fragment>
      </div>
    </div>
  );
}
