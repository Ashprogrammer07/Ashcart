
import axios from 'axios'
import { admindeleteorderFail, admindeleteorderRequest, admindeleteorderSuccess, adminorderFail, adminorderRequest, adminorderSuccess, adminupdateorderFail, adminupdateorderRequest, adminupdateorderSuccess, createorderFail, createorderRequest, createorderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, userorderFail, userorderRequest, userorderSuccess } from '../slices/orderSlices'

export const createOrder = order => async(dispatch) => {
    try {
        dispatch(createorderRequest())
        console.log(order)
        const {data } = await axios.post(`/api/v1/order/new`,order)
        dispatch(createorderSuccess(data))
        
    } catch (error) {
        dispatch(createorderFail(error.response?.data?.message || error.message))
    }
}
export const userOrder=async(dispatch)=>{
    try{
        dispatch(userorderRequest())
        const {data} =await axios.get(`api/v1/myorders`);
        dispatch(userorderSuccess(data))
    }
    catch(error){
        dispatch(userorderFail())
    }
}

export const GetDetail=(id)=>async(dispatch)=> {
    {
        try {
            dispatch(orderDetailRequest())
            const { data } = await axios.get(`/api/v1/order/${id}`)
            dispatch(orderDetailSuccess(data))

        }
        catch (error) {
            dispatch(orderDetailFail(error.response.data.message))
        }
    }
}
export const adminOrders=async(dispatch)=>{
    try{
        dispatch(adminorderRequest())
        const {data}=await axios.get('/api/v1/admin/orders')
        dispatch(adminorderSuccess(data))
    }
    catch(error){
        dispatch(adminorderFail(error?.response?.data?.message))
    }
}
export const adminorderUpdate=(id,formdata)=>async(dispatch)=>{
    try{
        dispatch(adminupdateorderRequest())
        
        const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
        await axios.put(`/api/v1/admin/order/${id}`,formdata,config)
        dispatch(adminupdateorderSuccess())
    }
    catch(error){
        dispatch(adminupdateorderFail(error?.response?.data?.message))
    }
}
export const OrderDelete=(id)=>async(dispatch)=>{
    try{
        dispatch(admindeleteorderRequest())
        await axios.delete(`/api/v1/admin/order/${id}`);
        dispatch(admindeleteorderSuccess())
    }
    catch(error){
        dispatch(admindeleteorderFail())
    }
}