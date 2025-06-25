import React, { Fragment, useEffect, useState } from "react";
import { createReview, getproduct } from "../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../layouts/loader";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import {Modal} from 'react-bootstrap';
import {clearError, clearreviewsubmitted,clearProduct} from '../../slices/productSlice'
import ProductReviews from "./productReview";



export default function Details() {

    const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product={}, loading,isreviewsubmitted ,error} = useSelector((state) => state.productState);
  const {user}=useSelector(state=>state.authState)
  const [quantity,setQuantity]=useState(1);
  const increaseQty = () => {
        const count = document.querySelector('.count')
        if(product.stock ==0 ||  count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if(count.valueAsNumber == 1 ) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

  useEffect(() => {
   
    if(isreviewsubmitted){
      handleClose()
      toast('Review Submitted Succcessfully',{
        type:"success",
        position:"bottom-center",
        onOpen: ()=>dispatch(clearreviewsubmitted())
      })
    }
    if(error){
      toast(error,{
        type:'error',position:'bottom-center',onOpen:()=>dispatch(clearError())
      })
    }
    if(!product._id|| isreviewsubmitted){
      dispatch(getproduct(id));
    }
    return ()=>{
      dispatch(clearProduct());
    }
     
  }, [dispatch, id,isreviewsubmitted,error]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating,setrating]=useState(1);
  const [comment,setcomment]=useState("");

  const reviewHandler=()=>{
    const formData= new FormData();
    formData.append('rating',rating);
    formData.append('comment',comment);
    formData.append('productId',id)
    dispatch(createReview(formData))
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (<Fragment>
        <Fragment>
          <MetaData title={product.name}/>
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
             <Carousel autoPlay infiniteLoop showThumbs={false}>
  {product.images &&
    product.images.map((image) => (
      <div key={image._id}>
        <img
          src={image.image}
          alt={product.name}
        />
      </div>
    ))}
</Carousel>


            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">{product.numofReviews}</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />
                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
              </div>

              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock==0?true:false}
                onClick={()=>{
                        dispatch(addCartItem(product._id, quantity));
                       
                        toast('Cart Item Added!',{
                            type: 'success',
                            position: 'bottom-center'
                        })
                    }}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                  id="stock_status"
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>
                {product.description}
              </p>

              <hr />
              <p id="product_seller" className="mb-3">
                Sold by: <strong>Amazon</strong>
              </p>
{user?<button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
                onClick={handleShow}
              >
                Submit Your Review
              </button>: <div className="alert alert-danger mt-5">Login to Post Review</div>}
             

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  
                  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body> <ul className="stars">
          {[1,2,3,4,5].map(star=>(
            <li className={`star ${star<=rating?'orange':''}`} value={star} onClick={()=>setrating(star)} onMouseOver={(e)=> e.target.classList.add('yellow')} onMouseOut={(e)=> e.target.classList.remove('yellow')}>
                              <i className="fa fa-star"></i>
                            </li>
          ))}
                            
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                           
                            onChange={(e)=>setcomment(e.target.value)}
                          />

                          <button
                        disabled={loading}onClick={(reviewHandler)}
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button></Modal.Body>
        
      </Modal>

                </div>
              </div>
             
            </div>
          </div>
           
        </Fragment>
        
      {product.reviews && product.reviews.length>0?<ProductReviews reviews={product.reviews}/>:null}</Fragment>)}
    </Fragment>
  );
}
