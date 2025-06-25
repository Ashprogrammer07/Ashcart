import { Fragment } from "react/jsx-runtime";
import MetaData from '../layouts/MetaData';
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { createProducts, getproduct, getProducts, updateProducts } from "../../actions/productsActions";
import {toast} from 'react-toastify';
import { clearError, clearProductUpdated } from "../../slices/productSlice";
export default function UpdateProduct(){
  const {loading,error,isproductUpdated,product}=useSelector(state=>state.productState);
  const [name,setname]=useState("");
  const [price,setprice]=useState(0);
  const [description,setdescription]=useState("");
  const [category,setcategory]=useState("");
  const [stock,setstock]=useState(0);
  const [seller,setseller]=useState("");
  const [images,setimages]=useState([]);
  const [imagespreview,setimagespreview]=useState([]);
  const [imagescleared,setimagescleared]=useState(false);
  const categories=['Electronics',
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
                'Home'];
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams()
    const onImageschange=(e)=>{
      const files=Array.from(e.target.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload=()=>{
          if(reader.readyState==2){
            setimagespreview(oldarray=>[...oldarray,reader.result])
            setimages(oldarray=>[...oldarray,file])
          }
        }
        reader.readAsDataURL(file)
        
      });
    }
    const onsubmitHandler=(e)=>{
      e.preventDefault();
      const formdata= new FormData();
      formdata.append('name',name);
      formdata.append('price',price);
      formdata.append('stock',stock);
      formdata.append('description',description);
      formdata.append('seller',seller);
      formdata.append('category',category);
      formdata.append('imagesCleared',imagescleared)
      images.forEach(image=>{
        formdata.append('images',image)
      })
      dispatch(updateProducts(id,formdata))
    }
    const clearimagehandler=()=>{
        setimages([])
        setimagespreview([])
        setimagescleared(true)
    }
    useEffect(()=>{
      if(isproductUpdated){
        toast("Product Updated Successfully",{
          type:"success",position: 'bottom-center',onload:()=>{dispatch(clearProductUpdated())}
        })
        dispatch(clearProductUpdated())
        setimages([])
       
        return;
      }
      if(error){
        toast(error,{
          type:'error',position:'bottom-center',onload:()=>{clearError()}
        })
      }
    },[error,dispatch,isproductUpdated])
   useEffect(() => {
  if (product && product._id) {
    setname(product.name);
    setprice(product.price);
    setdescription(product.description);
    setstock(product.stock);
    setcategory(product.category);
    setseller(product.seller);

    // 🧠 Clear first, then set preview from DB
    const previewUrls = product.images.map(img => img.image);
    setimagespreview(previewUrls); 
    setimages([]); // clear image files
  }
}, [product]);

useEffect(() => {
  dispatch(getproduct(id));
}, [dispatch, id]);

    
    return(
        <div className="row">
            <MetaData title={"Update Product"} />
                       <div className="col-12 col-md-2">
                           <Sidebar/>
                       </div>
       
                        <div className="col-12 col-md-10">
                            <Fragment>
            
             <div className="wrapper my-5"> 
        <form className="shadow-lg" encType='multipart/form-data'onSubmit={onsubmitHandler}>
            <h1 className="mb-4">Update Product</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e)=>setname(e.target.value)}
              />
            </div>

            <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e)=>setprice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e)=>setdescription(e.target.value)}></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select className="form-control" id="category_field" onChange={(e)=>setcategory(e.target.value)} value={category}>
                    <option value=''>Select</option>
                    {categories.map(c=>(
                      <option value={c} key={c}>{c}</option>
                    ))}
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={(e)=>setstock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={(e)=>setseller(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='images'
                            className='custom-file-input'
                            id='customFile'
                            multiple
                            onChange={onImageschange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Images
                        </label>
                    </div>
                    {imagespreview.length>0 && <span className="mr-2" style={{cursor:'pointer'}} onClick={clearimagehandler}><i className="fa fa-trash"></i></span>}
                    
                    {imagespreview.map(image=>(
                      <img className="mt-3 mr-2" key={image} src={image} alt={'Image Preview'} width='55' height='52'/>
                    ))}
                    
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
          
            >
              UPDATE
            </button>

          </form>
 </div>
 </Fragment>
    </div>
    </div>
    
    )
}