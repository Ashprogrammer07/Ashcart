import React, { useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/loader";
import Product from "./product/product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
const {Fragment} =React;
export default function Home() {
  const [currentpage,setCurrentpage]=useState(1);

  const dispatch=useDispatch();
  const {products,loading,error,productsCount,resperPage}=useSelector((state)=>state.productsState);
   useEffect(()=>{
    if(error){
    return toast.error(error)}
    dispatch(getProducts(null,null,null,null,currentpage))
   },[dispatch,error,currentpage])

  const setCurrentpageNO=(PAGENO)=>{
    setCurrentpage(PAGENO);
    console.log(PAGENO);
   }
    return(
      <Fragment>
        {loading?<Loader/>:
      <Fragment>
        <MetaData title={'Buy Best Products'}/>
         <h1 id="products_heading">Latest Products</h1>
        <section id="products" class="container mt-5">
      <div className="row">
        {products && products.map(product => (
           <Product col={3} key={product._id} product={product}/>
        ))
        }
        
      </div>
    </section>
    {
        productsCount > 0  && productsCount > resperPage?<div className="d-flex justify-content-center ,t-5">
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