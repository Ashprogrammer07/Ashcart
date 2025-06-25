import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [],
        loading: false,
        shippingInfo: localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')): {}
    },
    reducers: {
        addcartitemRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
     addcartitemSuccess(state, action) {
  const item = action.payload;
  console.log(item);

  const isItemExist = state.items.find(i => i.productId === item.productId);

  if (isItemExist) {
    // Item exists → update quantity or whatever field you want
    isItemExist.quantity = item.quantity; // OR += item.quantity
  } else {
    // Item does not exist → push new item
   state.items=[...state.items,item]
  }

  

  // Save updated cart to localStorage
  localStorage.setItem('cartItems', JSON.stringify(state.items));
  return state;
}
,



        increasecartitemquantity(state,action){
            state.items=state.items.map(item=>{
                if(item.productId==action.payload){
                    item.quantity=item.quantity+1
                }
                return item;
            })
            localStorage.setItem('cartItems',JSON.stringify(state.items));
        },
        decreasecartitemquantity(state,action){
            state.items=state.items.map(item=>{
                if(item.productId==action.payload){
                    item.quantity=item.quantity-1
                }
                return item;
            })
            localStorage.setItem('cartItems',JSON.stringify(state.items));
        },
        removeitemfromCart(state,action){
            const filterItems=state.items.filter(item=> {
                return item.productId !==action.payload
            })
            return {
                ...state,
                items:filterItems
            }
        },
        saveShippinginfo(state,action){
            localStorage.setItem('shippingInfo',JSON.stringify(action.payload))
            return{
                ...state,
                shippingInfo:action.payload
            }
        },
        ordercompleted(state,action){
            localStorage.removeItem('shippingInfo')
            localStorage.removeItem('cartItems')
            sessionStorage.removeItem('orderInfo')
            return{
    
                items:[],
                loading:false,
                shippingInfo:{}
            }
        },
        clearCart(state, action) {
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingInfo');
  return {
    ...state,
    items: [],
    shippingInfo: {},
  };
}

  }
});
const { actions, reducer } = cartSlice;

export const { addcartitemRequest,addcartitemSuccess,increasecartitemquantity,decreasecartitemquantity,removeitemfromCart,saveShippinginfo,ordercompleted,clearCart } = actions;
export default reducer;
