import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const userSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    user:[],
    users:[],
    isuserupdated:false,
    isuserdeleted:false
  },
  reducers: {
    usersRequest(state) {
      return{
        ...state,
        loading:true
      }
    },
    usersSuccess(state, action) {
      return{
        ...state,
        loading:false,
        users:action.payload.users
      }
    },
    usersFail(state, action) {
      return{
        loading:false,
        error:action.payload
      }
    },
     userRequest(state) {
      return{
        ...state,
        loading:true
      }
    },
    clearUserError(state,action){
      return{
        ...state,
        user:[]
      }
    },
    userSuccess(state, action) {
     return{
      ...state,
      loading:false,
      user:action.payload.user
     }
    },
    userFail(state, action) {
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    },
    clearerror(state,action){
      return{
        ...state,error: null
      }
    },
    userdeleteRequest(state) {
      return{
        ...state,
        loading:true
      }
    },
    userdeleteSuccess(state, action) {
     return{
      ...state,
      loading:false,
      isuserdeleted:true
     }
    },
    userdeleteFail(state, action) {
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    },
    cleardeleteerror(state,action){
      return{
        ...state,error: null,isuserdeleted:false
      }
    },
    userupdateRequest(state) {
      return{
        ...state,
        loading:true
      }
    },
    userupdateSuccess(state, action) {
     return{
      ...state,
      loading:false,
     isuserupdated:true
     }
    },
    userupdateFail(state, action) {
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    },
    clearupdateerror(state,action){
      return{
        ...state,error: null,isuserupdated:false
      }
    }
  }
});
const { actions, reducer } = userSlice;

export const { userFail,userRequest,userSuccess,usersFail,usersSuccess,usersRequest,userdeleteFail,userdeleteRequest,userdeleteSuccess
    ,userupdateFail,userupdateRequest,userupdateSuccess,cleardeleteerror,clearupdateerror,clearUserError
 } = actions;
export default reducer;
