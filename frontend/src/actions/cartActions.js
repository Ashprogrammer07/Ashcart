import {addcartitemRequest, addcartitemSuccess} from '../slices/cartSlice';
import axios from 'axios'
import {toast} from 'react-toastify'

export const addCartItem = (id, quantity) => async(dispatch) => {
    try {
        dispatch(addcartitemRequest())
        const {data } = await axios.get(`/api/v1/products/${id}`)
        dispatch(addcartitemSuccess({
            productId: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity
        }))
        
    } catch (error) {
        toast.error(error);
        
    }
}