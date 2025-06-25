import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { getProducts } from "../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/loader";
import Product from "./product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
const {Fragment} =React;
export default function ProductSearch() {
  const Categories=[
    'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
  ]

  const [currentpage,setCurrentpage]=useState(1);
  const [price,setPrice]=useState([1,3000]);
    const [pricechanged,setPricechanged]=useState(price);
  const {keyword}=useParams();
const [category,setCategory]=useState(null);
const [rating,setRating]=useState(0);
  const dispatch=useDispatch();
  const {products,loading,error,productsCount,resperPage}=useSelector((state)=>state.productsState);
   useEffect(()=>{
    if(error){
    return toast.error(error)}
    dispatch(getProducts(rating,category,pricechanged,keyword,currentpage))
   },[dispatch,error,currentpage,keyword,pricechanged,category,rating])

  const setCurrentpageNO=(PAGENO)=>{
    setCurrentpage(PAGENO);
    console.log(PAGENO);
   }
    return(
      <Fragment>
        {loading?<Loader/>:
      <Fragment>
        <MetaData title={'Buy Best Products'}/>
         <h1 id="products_heading">Search Products</h1>
        <section id="products" class="container mt-5">
      <div class="row">
        <div className="col-6 col-md-3 mb-5 mt-5">
          <h3 className="mb-3">Price Range</h3>
          <div className="px-5" onMouseUp={()=>setPricechanged(price)}>
            <Slider range={true}
            marks={{
              1:"$1",
              1000:"$1000"

            }}
            min={1}
            max={1000}
            defaultValue={price}
            onChange={(price)=>{
              setPrice(price);
            }}
            handleRender={
              renderProps=>{
                return (
                  <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                    <div {...renderProps.props}></div>
                  </Tooltip>
                )
              }
            }/>
          </div>
          <hr className="my-5"/>


          <div className="mt-5">
            <h3 className="mb-3">Categories</h3>
            <ul className="pl-0">
              {Categories.map(Category=>
                   <li style={{cursor:"pointer",listStyle:"none"}} key={Category}  onClick={()=>
                    setCategory(Category)
                   }>{Category}</li>
              )}
             
            </ul>
          </div>

          <div mt-5>
            <h3 className="mb-3">Rating</h3>
            <ul className="pl-0">
              {[5,4,3,2,1].map(star=>
                   <li style={{cursor:"pointer",listStyle:"none"}} key={star} onClick={()=>
                    setRating(star)
                   }>
                    <div className="rating-outer">
                      <div className="rating-inner" style={{width: `${star *20}%`}}>

                      </div>
                    </div>
                   </li>
              )}
             
            </ul>

          </div>
        </div>
        <div className="col-6 col-md-9 ">
          <div className="row">
              {products && products.map(product => (
           <Product col={4} key={product._id} product={product}/>
        ))
        }
          </div>
        </div>
        
        
      </div>
    </section>
    {
        productsCount>0  && productsCount > resperPage?<div className="d-flex justify-content-center ,t-5">
      <Pagination
        activePage={currentpage}
        onChange={setCurrentpageNO}
        totalItemsCount={productsCount}
        itemsCountPerPage={resperPage}
        nextPageText={"Next"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass={'page-item'}
        linkClass={'page-link'}
      />
    </div>:null
    }
    </Fragment>
}
    </Fragment>
    
    )
}