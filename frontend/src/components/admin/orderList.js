import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import MetaData from "../layouts/MetaData";
import Loader from '../layouts/loader';
import { MDBDataTable } from 'mdbreact';
import Sidebar from "./sidebar";

import {
  clearOrderDeleted,
  clearorderError,
  clearOrderUpdated
} from "../../slices/orderSlices";

import {
  adminOrders as adminordersaction,
  OrderDelete
} from "../../actions/orderActions";

export default function OrderList() {
  const { adminOrders = [], loading, error, isorderdeleted } = useSelector(state => state.orderState);
  const dispatch = useDispatch();

  const setOrders = (adminOrders) => {
    const data = {
      columns: [
        { label: "ID", field: 'id', sort: 'asc' },
        { label: "Number of Items", field: 'numofItems', sort: 'asc' },
        { label: "Amount", field: 'amount', sort: 'asc' },
        { label: "Status", field: 'status', sort: 'asc' },
        { label: "Actions", field: 'actions', sort: 'asc' },
      ],
      rows: []
    };

    adminOrders.forEach(order => {
      data.rows.push({
        id: order._id,
        numofItems: order.orderItems.length,
        amount: `₹${order.totalPrice}`,
        status: (
          <p style={{ color: order.orderStatus.includes('Processing') ? 'red' : 'green' }}>
            {order.orderStatus}
          </p>
        ),
        actions: (
          <Fragment>
            <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              className="btn btn-danger py--1 px-2 ml-2"
              onClick={(e) => deleteHandler(e, order._id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(OrderDelete(id));
  };

  useEffect(() => {
    // Fetch orders on mount
    dispatch(adminordersaction);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'bottom-center' });
      dispatch(clearorderError());
    }

    if (isorderdeleted) {
      toast.success("Order Deleted Successfully!!!", { position: 'bottom-center' });
      dispatch(clearOrderDeleted());
    }

    
  }, [error, isorderdeleted, loading, adminOrders, dispatch]);

  return (
    <div className="row">
      <MetaData title={"Order List"} />

      <div className="col-12 col-md-2">
        <Sidebar />
      </div>

      <div className="col-12 col-md-10">
        <h1 className="my-4">Order List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders(adminOrders)}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
