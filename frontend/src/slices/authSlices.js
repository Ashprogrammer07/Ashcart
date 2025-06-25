import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isauthenticated: false
    },
    reducers: {
        LoginRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        LoginSuccess(state, action){
            return {
                loading: false,
                isauthenticated: true,
                user: action.payload.user
            }
        },
        LoginFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearError(state, action){
            return {
                ...state,
                error:  null
            }
        },
        RegisterRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        RegisterSuccess(state, action){
            return {
                loading: false,
                isauthenticated: true,
                user: action.payload.user
            }
        },
        RegisterFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        loaduserRequest(state, action){
            return {
                ...state,
                isauthenticated: false,
                loading: true,
            }
        },
        loaduserSuccess(state, action){
            return {
                loading: false,
                isauthenticated: true,
                user: action.payload.user
            }
        },
        loaduserFail(state, action){
            return {
                ...state,
                loading: false,
            }
        },
        
        logoutSuccess(state, action){
            return {
                loading: false,
                isauthenticated: false,
            }
        },
        logoutFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
       updateprofileRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        updateprofileSuccess(state, action){
            return {...state,
                loading: false,
                user: action.payload.user,
                isupdated:true
               
            }
        },
        updateprofileFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearUpdateProfile(state, action){
            return {
                ...state,
                isUpdated: false
            }
        },
        updatepasswordRequest(state, action){
            return {
                ...state,
                loading: true,
                isupdated:false
            }
        },
        updatepasswordSuccess(state, action){
            return {...state,
                loading: false,
                isupdated:true
               
            }
        },
        updatepasswordFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearUpdateProfile(state,action){
            return {
                ...state,
                isupdated:false
            }
        },
        forgotpasswordRequest(state, action){
            return {
                ...state,
                loading: true,
                message:null
                
        
            }
        },
        forgotpasswordSuccess(state, action){
            return {...state,
                loading: false,
                isupdated:true,
                message:action.payload.message
               
            }
        },
        forgotpasswordFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        resetpasswordRequest(state, action){
            return {
                ...state,
                loading: true,
                isupdated:false
            }
        },
        resetpasswordSuccess(state, action){
            return {...state,
                loading: false,
                isauthenticated:true,
                user
               
            }
        },
        resetpasswordFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },


        
    }
});

const { actions, reducer } = authSlice;

export const { 
    LoginRequest, 
    LoginSuccess, 
    LoginFail, 
    clearError,
    RegisterRequest,
    RegisterSuccess,
    RegisterFail,
    loaduserRequest,
    loaduserSuccess,
    loaduserFail,
    logoutFail,
    logoutSuccess,
    updateprofileFail,
    updateprofileRequest,
    updateprofileSuccess,
    clearUpdateProfile,
    updatepasswordFail,updatepasswordRequest,updatepasswordSuccess,
    forgotpasswordFail,forgotpasswordRequest,forgotpasswordSuccess,
    resetpasswordFail,resetpasswordRequest,resetpasswordSuccess,
    
    
    
 } = actions;

export default reducer;
