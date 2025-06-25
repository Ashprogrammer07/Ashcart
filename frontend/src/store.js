import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSreducer from "./slices/productsSlice";
import productreducer from "./slices/productSlice";
import authreducer from "./slices/authSlices";
import cartreducer from './slices/cartSlice';
import orderreducer from './slices/orderSlices';
import thunk from 'redux-thunk';
import userreducer from './slices/userSlices'
const reducer = combineReducers({
  productsState: productSreducer,
  productState: productreducer,
  authState: authreducer,
  cartState: cartreducer,
  orderState: orderreducer,
  userState:userreducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
