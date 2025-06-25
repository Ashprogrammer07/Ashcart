import { Fragment, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./sidebar";

import { deleteReview, getReviews } from "../../actions/productsActions";
import {
  cleardeleteerror,
} from "../../slices/userSlices"; // or productSlice if defined there

export default function ReviewList() {
  const dispatch = useDispatch();
  const [productid, setproductid] = useState("");

  const {
    reviews = [],
    loading,
    error,
    isreviewdeleted,
  } = useSelector((state) => state.productState);
  console.log(reviews); // full object


  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteReview(productid,id));
  };

  // Show error
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-center" });
      dispatch(cleardeleteerror());
    }
  }, [error, dispatch]);

  // Show success message
  useEffect(() => {
    if (isreviewdeleted) {
      toast.success("Review Deleted Successfully!", {
        position: "bottom-center",
      });
      dispatch(cleardeleteerror());
      dispatch(getReviews(productid)); // Refresh the reviews list
    }
  }, [isreviewdeleted, dispatch, productid]);

  const onsubmithandler = (e) => {
    e.preventDefault(); // ✅ fixed typo here
    if (!productid.trim()) {
      toast.warn("Please enter a product ID", {
        position: "bottom-center",
      });
      return;
    }
    dispatch(getReviews(productid));
  };

  const data = useMemo(() => {
    return {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Rating", field: "rating", sort: "asc" },
        { label: "User", field: "user", sort: "asc" },
        { label: "Comment", field: "comment", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: reviews.map((r) => ({
        id: r._id,
        rating: r.rating,
        user: r.user?.name || "Unknown",
        comment: r.comment,
        actions: (
          <Fragment>
            <Button
              className="btn btn-danger btn-sm ml-2"
              onClick={(e) => deleteHandler(e, r._id)}
            >
                
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      })),
    };
  }, [reviews]);

  return (
    <div className="row">
      <MetaData title={"Review List"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Review List</h1>
        <div className="row justify-content-center">
          <div className="col-5">
            <form onSubmit={onsubmithandler}>
              <div className="form-group">
                <label>Product ID</label>
                <input
                  type="text"
                  onChange={(e) => setproductid(e.target.value)}
                  value={productid}
                  className="form-control"
                />
              </div>
              <button
                className="btn btn-primary btn-block py-2"
                type="submit"
                disabled={loading}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={data}
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
