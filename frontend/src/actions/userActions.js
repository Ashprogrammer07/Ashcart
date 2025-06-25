import { LoginRequest,LoginFail,LoginSuccess,clearError, RegisterRequest, 
    RegisterSuccess, RegisterFail, loaduserRequest, loaduserSuccess, 
    loaduserFail, logoutSuccess, logoutRequest, logoutFail, updateprofileRequest, updateprofileSuccess, updateprofileFail, updatepasswordRequest,updatepasswordFail,updatepasswordSuccess
     ,forgotpasswordFail,forgotpasswordRequest,forgotpasswordSuccess,resetpasswordFail,resetpasswordRequest,resetpasswordSuccess} from "../slices/authSlices";
import axios from "axios";
import{ clearCart} from '../slices/cartSlice'

export const login =(email,password)=> async (dispatch)=>{
    try{
        dispatch(LoginRequest())
    const { data } = await axios.post('/api/v1/login', { email, password }); // ✅ send as JSON

        dispatch(LoginSuccess(data))
    }
    catch(error){
        dispatch(LoginFail(error?.response?.data?.message ));
    }

}

export const clearAutherror=(dispatch)=>{
    dispatch(clearError)
}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(RegisterRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.post(`/api/v1/register`,userData, config);
        dispatch(RegisterSuccess(data))
    } catch (error) {
        dispatch(RegisterFail(error?.response?.data?.message))
    }

}

export const loaduser = async (dispatch) => {

    try {
        dispatch(loaduserRequest())
       

        const { data }  = await axios.get('/api/v1/myprofile');
        dispatch(loaduserSuccess(data))
    } catch (error) {
        dispatch(loaduserFail(error.response.data.message))
    }

}

export const logout = async (dispatch) => {

    try {
        
         await axios.get('/api/v1/logout');
        dispatch(logoutSuccess());
        dispatch(clearCart());
localStorage.removeItem('cartItem');


    } catch (error) {
        dispatch(logoutFail(error?.response?.data?.message));
    }

}

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateprofileRequest())
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

        const { data }  = await axios.put(`/api/v1/myprofile/update`,userData, config);
        dispatch(updateprofileSuccess(data))
    } catch (error) {
        dispatch(updateprofileFail(error.response.data.message))
    }

}

export const updatePassword = (userData) => async (dispatch) => {

    try {
        dispatch(updatepasswordRequest())
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

         await axios.put(`/api/v1/password/change`,userData);
        dispatch(updatepasswordSuccess())
    } catch (error) {
        dispatch(updatepasswordFail(error.response.data.message))
    }

}

export const forgotPassword = (userData) => async (dispatch) => {
  try {
    dispatch(forgotpasswordRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const { data } = await axios.post(`/api/v1/password/forgot`, userData, config);

    dispatch(forgotpasswordSuccess(data)); // ✅ dispatch the message string
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    dispatch(forgotpasswordFail(message));
  }
};




export const resetPassword = (userData, token) => async (dispatch) => {
  try {
    dispatch(resetpasswordRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const { data } = await axios.post(`/api/v1/password/reset/${token}`, userData, config);

    dispatch(resetpasswordSuccess(data.message));  // ✅ must be data.message
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    console.log("Reset Password Error:", message); // ✅ Debug line
    dispatch(resetpasswordFail(message));
  }
};




