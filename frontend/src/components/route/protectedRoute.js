import { useSelector } from "react-redux";
import {Navigate } from "react-router-dom";
import Loader from '../layouts/loader';
export default function ProtectedRoute({children,isadmin}){
    const {isauthenticated,loading,user}=useSelector(state => state.authState)
 
    if(!isauthenticated && !loading){
        return <Navigate to='/login'/>
    }
    if(isauthenticated ){
        if(isadmin==true &&user.role !=='admin'){
            return <Navigate to='/'/>
        }
    return children;}
    if(loading){
        return <Loader/>
    }
}