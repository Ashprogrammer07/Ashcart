import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

export default function Search(){
  const location=useLocation();
    const navigate=useNavigate();
    const [keyword,setKeyword]=useState("");

    const searchHandler=(e)=>{
        e.preventDefault();
        navigate(`/search/${keyword}`)
        
    }
    const clearkeyword=()=>{
      setKeyword("");
    }
    useEffect(()=>{
      if(location.pathname=='/'){
        clearkeyword();
      }
    },[location])
    return(

            <form onSubmit={searchHandler}>
                <div className='input-group'>
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            onChange={(e)=>{setKeyword(e.target.value)}}
            value={keyword}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          </div>
          </form>
    )
}