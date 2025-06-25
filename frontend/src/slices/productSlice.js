import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    isreviewsubmitted:false,
    product:{},
    isProductCreated:false,
    isproductDeleted:false,
    isproductUpdated:false,
    isreviewsubmitted:false,
    reviews:[]
  },
  reducers: {
    productRequest(state) {
     return{
      ...state,
      loading: true,

     }
    },
    productSuccess(state, action) {
     return{
      ...state,
      loading:false,
      product: action.payload.product

     }
    },
    productFail(state, action) {
      return{
        ...state,
        loading:false,
        error: action.payload
      }
    },
    createreviewRequest(state) {
      return{
        ...state,loading:true
      }
    },
    createreviewSuccess(state, action) {
      return{
        ...state,loading:false,isreviewsubmitted:true
      }
    },
   createreviewFail(state,action){
    return{
      ...state,
      loading:false,error:action.payload
    }
   },
   clearError(state,action){
    return{
      ...state,
      error:null
    }
   },
   clearreviewsubmitted(state,action){
    return{
      ...state,
      isreviewsubmitted:false
    }
   },
   clearProduct(state,action){
    return{
      ...state,
      product:{}
    }
   },
   newproductRequest(state) {
     return{
      ...state,
      loading: true,

     }
    },
    newproductSuccess(state, action) {
     return{
      ...state,
      loading:false,
      product: action.payload.product,isProductCreated:true

     }
    },
    newproductFail(state, action) {
      return{
        ...state,
        loading:false,
        error: action.payload,isProductCreated:false
      }
    },
    clearProductCreated(state,action){
      return{
        ...state,
        isProductCreated:false
      }
    },
    deleteproductRequest(state,action){
      return{
        ...state,loading:true,isproductDeleted:false
      }
    },
    deleteproductSuccess(state, action) {
     return{
      ...state,
      loading:false,isproductDeleted:true

     }
    },
    deleteproductFail(state, action) {
      return{
        ...state,
        loading:false,
        error: action.payload
      }
    },
    clearProductDeleted(state,action){
      return{
        ...state,
        isproductDeleted:false
      }
    },
    updateproductRequest(state) {
     return{
      ...state,
      loading: true,

     }
    },
    updateproductSuccess(state, action) {
     return{
      ...state,
      loading:false,
      product: action.payload.product,isproductUpdated:true

     }
    },
    updateproductFail(state, action) {
      return{
        ...state,
        loading:false,
        error: action.payload,
      }
    },
    clearProductUpdated(state,action){
      return{
        ...state,
        isproductUpdated:false
      }
    },
    adminreviewsRequest(state) {
     return{
      ...state,
      loading: true,

     }
    },
    adminreviewsSuccess(state, action) {
     return{
      ...state,
      loading:false,
      reviews:action.payload.reviews,
      isreviewsubmitted:true

     }
    },
    adminreviewsFail(state, action) {
      return{
        ...state,
        loading:false,
        error: action.payload
      }
    },
    deletereviewRequest(state) {
     return{
      ...state,
      loading: true,

     }
    },
    deletereviewSuccess(state, action) {
     return{
      ...state,
      loading:false,
      isreviewdeleted:true

     }
    },
    deletereviewFail(state, action) {
      return{
        ...state,
        loading:false,
        error: action.payload
      }
    },
    cleardeletereview(state,action){
      return{
        ...state,isreviewdeleted:false
      }
    }


  }
});
const { actions, reducer } = productSlice;

export const { productRequest, productSuccess, productFail,clearError,createreviewFail,
  createreviewRequest,createreviewSuccess,clearreviewsubmitted,clearProduct,clearProductCreated,newproductFail,
  newproductRequest,newproductSuccess,deleteproductFail,deleteproductSuccess,deleteproductRequest,
  clearProductDeleted,updateproductFail,updateproductRequest,updateproductSuccess,
  clearProductUpdated,adminreviewsRequest,adminreviewsSuccess,adminreviewsFail,deletereviewRequest,deletereviewFail,deletereviewSuccess,cleardeletereview} = actions;
export default reducer;
