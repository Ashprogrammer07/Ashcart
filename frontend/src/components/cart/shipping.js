import { Fragment, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import MetaData from "../layouts/MetaData";
import {countries} from 'countries-list';
import { saveShippinginfo } from "../../slices/cartSlice";
import {useNavigate} from 'react-router-dom';
import CheckoutSteps from './checkoutSteps';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const validateShipping = (shippingInfo, navigate) => {
    const { address, phoneno, postalcode, state, country, city } = shippingInfo;
    console.log("🔎 Validating:", shippingInfo);


    if (
        !address?.trim() ||
        !phoneno?.trim() ||
        !postalcode?.trim() ||
        !state?.trim() ||
        !country?.trim() ||
        !city?.trim()
    ) {
       
        toast("Please fill in all shipping information", {
            position: 'bottom-center',
            type: "error",
        });
        navigate('/shipping');
        return false;
    }

    return true;
};

export default function ShippingInfo(){

    const {shippingInfo}=useSelector(state=>state.cartState);
    const [address,setAddress]=useState(shippingInfo.address)
    const [city,setCity]=useState(shippingInfo.city);
    const [postalcode,setpostalcode]=useState(shippingInfo.postalcode);
    const [phoneno,setphoneno]=useState(shippingInfo.phoneno)
    const [country,setcountry]=useState(shippingInfo.country);
    const [state,setstate]=useState(ShippingInfo.state);
    const countrylist=Object.values(countries);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submithandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippinginfo({address,city,phoneno,postalcode,country,state}))
        navigate("/order/confirm");

    }
    return  (
        <Fragment>
            <MetaData title={"Shipping"}/>
            <CheckoutSteps shipping/>
              <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submithandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                 onChange={(e)=>setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlhtmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneno}
                                 onChange={(e)=>setphoneno(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalcode}
                                 onChange={(e)=>setpostalcode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">State</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control"
                                value={state}
                                 onChange={(e)=>setstate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                                <label htmlFor="country_field">Country</label>
                                <select
                                    id="country_field"
                                    className="form-control"
                                    value={country}
                                    onChange={(e) => setcountry(e.target.value)}
                                    required

                                >{ countrylist.map((country, i) => (

                                    <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                                ))
                                }
                                </select>
                            </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}