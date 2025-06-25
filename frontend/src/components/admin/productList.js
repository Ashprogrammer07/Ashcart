import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearerror } from "../../slices/productsSlice";
import { DeleteProduct, getAdminProducts } from "../../actions/productsActions";
import MetaData from "../layouts/MetaData";
import Loader from '../layouts/loader'
import {MDBDataTable} from 'mdbreact';
import Sidebar from "./sidebar";
import { clearProductDeleted } from "../../slices/productSlice";
export default function PorductList(){
    const {products,loading,error}=useSelector(state => state.productsState);
    const {isproductDeleted,error:deleteerror}=useSelector(state=>state.productState)
    const dispatch=useDispatch();
    const setProducts=(products)=>{
        const data={
            columns:[
                {label:"ID",field:'id',sort:'asc'},
                {label:"price",field:'price',sort:'asc'},
                {label:"stock",field:'stock',sort:'asc'},
                {label:"Actions",field:'actions',sort:'asc'},
            ],
            rows:[]
            
        };
         products.forEach((product) => {
    data.rows.push({
      id: product._id,
      price: `$${product.price}`,
      stock: product.stock,
      actions: (
        <Fragment>
          <Link
            to={`/admin/products/${product._id}`}
            className="btn btn-primary"
          >
            <i className="fa fa-pencil"></i>
          </Link>
          <Button
            className="btn btn-danger py--1 px-2 ml-2"
            onClick={(e) => deleteHandler(e,product._id)} // optional
          >
            <i className="fa fa-trash"></i>
          </Button>
        </Fragment>
      ),
    });
  });
 

  return data;
};
    useEffect(()=>{
        if(error|| deleteerror){
            toast(error|| deleteerror,{
                type:"error",position:'bottom-center',onOpen:()=>{dispatch(clearerror)}
            })
            return;
        }
        if(isproductDeleted){
          toast("Product Deleted Successfully!!!",{
            type:'success',position:'bottom-center',onOpen:()=>{clearProductDeleted()}
          })
          return;
        }
        dispatch(getAdminProducts)
    },[dispatch,error,isproductDeleted])

     const deleteHandler=(e,id)=>{
    e.target.disabled=true;
    dispatch(DeleteProduct(id))
  }
    return(
                <div className="row">
                    <MetaData title={"Product list"}/>
                    
                    <div className="col-12 col-md-2">
                                        <Sidebar/>
                                    </div>
                    <div className="col-12 col-md-10">
                    <h1 className="my-4">Product List</h1>
                    <Fragment>
                        {loading?<Loader/>:
                        <MDBDataTable
                        data={setProducts(products)}
                        bordered
                        striped
                        hover
                        className='px-3'/>}
                    </Fragment>
                           
                </div>
                </div>
             
    )
}