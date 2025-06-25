import { userdeleteFail, userdeleteRequest, userdeleteSuccess, userFail, userRequest, usersFail, usersRequest, usersSuccess, userSuccess, userupdateFail, userupdateRequest, userupdateSuccess } from "../slices/userSlices";
import axios from "axios";
export const GetallUsers = () => async (dispatch) => {
  try {
    dispatch(usersRequest());

    const response = await axios.get("/api/v1/admin/users");
   

    const { data } = response;
    

    dispatch(usersSuccess(data));
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    dispatch(usersFail(message));
  }
};

export const GetUser =id=> async (dispatch) => {

    try {
        dispatch(userRequest())
       

        const { data }  = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }

}
export const DeleteUser =id=> async (dispatch) => {

    try {
        dispatch(userdeleteRequest())
       

        await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(userdeleteSuccess())
    } catch (error) {
        dispatch(userdeleteFail(error.response.data.message))
    }

}

export const updateUser =(id,formdata)=> async (dispatch) => {

    try {
        dispatch(userupdateRequest())
       const config={
        headers:{
            'Content-type':'application/json'
        }
       }

        const { data }  = await axios.put(`/api/v1/admin/user/${id}`,formdata,config);
        dispatch(userupdateSuccess(data))
    } catch (error) {
        dispatch(userupdateFail(error.response.data.message))
    }

}