import { Fragment } from "react/jsx-runtime";
import MetaData from '../layouts/MetaData';
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from '../layouts/loader';

import { adminorderUpdate, GetDetail } from "../../actions/orderActions";
import { clearorderError, clearOrderUpdated } from "../../slices/orderSlices";

export default function UpdateOrder() {
  const { loading, isorderupdated, error, orderDetail } = useSelector(state => state.orderState);

  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
    orderStatus: fetchedOrderStatus = "Processing"
  } = orderDetail || {};

  const isPaid = paymentInfo.status === 'succeeded';

  const [orderStatus, setOrderStatus] = useState('Processing');

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const onsubmitHandler = (e) => {
    e.preventDefault();
    dispatch(adminorderUpdate(id, { orderStatus }));
  };

  useEffect(() => {
    if (isorderupdated) {
      toast.success("Order Updated Successfully", {
        position: 'bottom-center',
        onOpen: () => dispatch(clearOrderUpdated())
      });
    }

    if (error) {
      toast.error(error, {
        position: 'bottom-center',
        onOpen: () => dispatch(clearorderError())
      });
    }

    dispatch(GetDetail(id));
  }, [dispatch, error, isorderupdated, id]);

  useEffect(() => {
    if (orderDetail && orderDetail._id) {
      setOrderStatus(fetchedOrderStatus);
    }
  }, [orderDetail]);

  if (!orderDetail || !orderDetail._id) return <Loader />;

  return (
    <div className="row">
      <MetaData title={"Update Order"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>

      <div className="col-12 col-md-10">
        <Fragment>
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order #{orderDetail._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p><b>Name:</b> {user?.name}</p>
              <p><b>Phone:</b> {shippingInfo?.phoneno}</p>
              <p className="mb-4">
                <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.postalcode}, {shippingInfo?.state}, {shippingInfo?.count}
              </p>
              <p><b>Amount:</b> ₹{totalPrice}</p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p className={orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'}>
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>
              <hr />
              <div className="cart-item my-1">
                {orderItems && orderItems.map((item, index) => (
                  <div className="row my-5" key={index}>
                    <div className="col-4 col-lg-2">
                      <img src={item.image} alt={item.name} height="45" width="65" />
                    </div>
                    <div className="col-5 col-lg-5">
                      <Link to={`/product/${item.productId}`}>{item.name}</Link>
                    </div>
                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>₹{item.price}</p>
                    </div>
                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{item.quantity} Piece(s)</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>

            <div className="col-12 col-lg-3 mt-5">
              <h1 className="my-4">Order Status</h1>
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={e => setOrderStatus(e.target.value)}
                  value={orderStatus}
                  name="Status"
                >
                  <option value={'Processing'}>Processing</option>
                  <option value={'Shipped'}>Shipped</option>
                  <option value={'Delivered'}>Delivered</option>
                </select>
              </div>
              <button
                className="btn btn-primary btn-block"
                disabled={loading}
                onClick={onsubmitHandler}
              >
                Update Status
              </button>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
