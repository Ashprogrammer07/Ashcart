import { createSlice } from "@reduxjs/toolkit";



const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail:{},
        userOrders:[],
        adminOrders:[],
        isorderdeleted:false,
        isorderupdated:false
    },
    reducers: {
        createorderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        createorderSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderDetail:action.payload.orders
            }
        },
        createorderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        clearorderError(state,action){
            return{
                ...state,
                error:null
            }
        },
        userorderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        userorderSuccess(state,action){
            return{
                ...state,
                loading:false,
                userOrders:action.payload.orders
            }
        },
        userorderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        orderDetailRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        orderDetailSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderDetail:action.payload.order
            }
        },
        orderDetailFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        adminorderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        adminorderSuccess(state,action){
            return{
                ...state,
                loading:false,
                adminOrders:action.payload.orders
            }
        },
        adminorderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        admindeleteorderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        admindeleteorderSuccess(state,action){
            return{
                ...state,
                loading:false,
                isorderdeleted:true
        }
    },
        admindeleteorderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        adminupdateorderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        adminupdateorderSuccess(state,action){
            return{
                ...state,
                loading:false,
                isorderupdated:true
        }
    },
        adminupdateorderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        clearOrderDeleted(state,action){
            return{
                ...state,
                isorderdeleted:false
            }
        },
        clearOrderUpdated(state,action){
            return{
                isorderupdated:false
            }
        }
    }
});
const { actions, reducer } = orderSlice;

export const { createorderRequest,createorderSuccess,createorderFail,
    clearorderError,userorderFail,userorderRequest,userorderSuccess,
    orderDetailFail,orderDetailRequest,orderDetailSuccess,admindeleteorderFail,admindeleteorderRequest
,admindeleteorderSuccess,adminupdateorderFail,adminupdateorderRequest,
adminupdateorderSuccess,clearOrderDeleted,clearOrderUpdated,adminorderRequest,adminorderFail,adminorderSuccess } = actions;
export default reducer;
