import { Fragment, useEffect } from "react";
import MetaData from '../components/layouts/MetaData';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from "react-redux";
import { userOrder as userorderAction } from "../actions/orderActions";
import { Link } from "react-router-dom";

export default function UserOrder() {
    const dispatch = useDispatch();

    const { userOrders = [] } = useSelector(state => state.orderState);

    useEffect(() => {
        dispatch(userorderAction);
    }, []);

    const setOrders = () => {
        const data = {
            columns: [
                { label: "Order ID", field: 'id', sort: 'asc' },
                { label: 'Number of Items', field: 'numOfItems', sort: 'asc' },
                { label: 'Amount', field: 'amount', sort: 'asc' },
                { label: 'Status', field: 'status', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' }
            ],
            rows: []
        };

        userOrders.forEach(userorder => {
            data.rows.push({
                id: userorder._id,
                numOfItems: userorder.orderItems.length,
                amount: `₹${userorder.totalPrice}`,
                status: userorder.orderStatus.includes("Delivered")
                    ? <p style={{ color: 'green' }}>{userorder.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{userorder.orderStatus}</p>,
                actions: (
                    <Link to={`/order/${userorder._id}`} className="btn btn-primary">
                        <i className="fa fa-eye" />
                    </Link>
                )
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title={"My Orders"} />
            <h1 className="mt-5">My Orders</h1>
            <MDBDataTable className="px-3" bordered striped hover data={setOrders()} />
        </Fragment>
    );
}
