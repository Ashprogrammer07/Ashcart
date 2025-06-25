import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { clearError } from "./productSlice";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null
  },
  reducers: {
    productsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    productsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products; // use plural "productss"
      state.productsCount=action.payload.count;
      state.resperPage=action.payload.resPerPage
    },
    productsFail(state, action) {
      state.loading = true;
      state.error = action.payload;
    },
     adminproductsRequest(state) {
      return{
        ...state,
        loading:true
      }
    },
    adminproductsSuccess(state, action) {
     return{
      ...state,
      loading:false,
      products:action.payload.products
     }
    },
    adminproductsFail(state, action) {
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
    }
  }
});
const { actions, reducer } = productsSlice;

export const { productsRequest, productsSuccess, productsFail,adminproductsFail,adminproductsRequest,adminproductsSuccess,clearerror } = actions;
export default reducer;
