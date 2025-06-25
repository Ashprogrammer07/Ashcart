import axios from 'axios';
import { productsRequest, productsFail, productsSuccess, adminproductsRequest, adminproductsSuccess, adminproductsFail } from '../slices/productsSlice';
import { productRequest, productFail, productSuccess, createreviewRequest, createreviewSuccess, createreviewFail, newproductRequest, newproductSuccess, newproductFail, deleteproductRequest, deleteproductSuccess, deleteproductFail, updateproductFail, updateproductRequest, updateproductSuccess, adminreviewsRequest, adminreviewsSuccess, adminreviewsFail, deletereviewRequest, deletereviewSuccess, deletereviewFail } from '../slices/productSlice';



export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {  
        dispatch(productsRequest()) 
        let link = `/api/v1/products?page=${currentPage}`;
        
        if(keyword) {
            link += `&keyword=${keyword}`
        }
        if(price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category) {
            link += `&category=${category}`
        }
        if(rating) {
            link += `&ratings=${rating}`
        }
        
        const { data }  =  await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message))
    }
    
}






export const getproduct=id=>async(dispatch)=>{
    try {
        dispatch(productRequest());
       
        const {data}= await axios.get(`/api/v1/products/${id}`);
        dispatch(productSuccess(data));
    } catch (error) {
        dispatch(productFail(error.response?.data?.message || error.message));
    }
}

export const createReview=review=>async(dispatch)=>{
    try {
        dispatch(createreviewRequest());
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
       
        const {data}= await axios.post(`/api/v1/products/reviews`,review,config);
        dispatch(createreviewSuccess(data));
    } catch (error) {
        dispatch(createreviewFail(error.response?.data?.message || error.message));
    }
}


export const getAdminProducts=async(dispatch)=>{
    try{
        dispatch(adminproductsRequest())
        const {data}= await axios.get(`/api/v1/admin/products`)
        dispatch(adminproductsSuccess(data))
    }
    catch(error){
        dispatch(adminproductsFail(error.response.data.message))
    }
}
export const createProducts=(formdata)=>async(dispatch)=>{
    try{
        dispatch(newproductRequest())
     
        const {data}= await axios.post(`/api/v1/admin/products/new`,formdata)
        dispatch(newproductSuccess(data))
    }
    catch(error){
        dispatch(newproductFail(error.response.data.message))
    }
}
export const DeleteProduct=(id)=>async(dispatch)=>{
    try{
        dispatch(deleteproductRequest())
     
        await axios.delete(`/api/v1/admin/products/${id}`),
        dispatch(deleteproductSuccess())
    }
    catch(error){
        dispatch(deleteproductFail(error.response.data.message))
    }
}
export const updateProducts=(id,formdata)=>async(dispatch)=>{
    try{
        dispatch(updateproductRequest())
     
        const {data}= await axios.put(`/api/v1/admin/products/${id}`,formdata)
        dispatch(updateproductSuccess(data))
    }
    catch(error){
        dispatch(updateproductFail(error.response.data.message))
    }
}
export const getReviews=(id)=>async(dispatch)=>{
    try {
        dispatch(adminreviewsRequest());
        
        const {data}= await axios.get(`/api/v1/admin/products/reviews`,{params:{id}});
        dispatch(adminreviewsSuccess(data));
    } catch (error) {
        dispatch(adminreviewsFail(error.response?.data?.message || error.message));
    }
};
export const deleteReview=(productId,id)=>async(dispatch)=>{
    try {
        dispatch(deletereviewRequest());
        
        await axios.delete(`/api/v1/admin/products/reviews`,{params:{productId,id}});
        dispatch(deletereviewSuccess());
    } catch (error) {
        dispatch(deletereviewFail(error.response?.data?.message || error.message));
    }
};
 