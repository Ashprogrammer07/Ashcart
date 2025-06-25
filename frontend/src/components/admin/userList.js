import { Fragment, useEffect, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./sidebar";
import { DeleteUser, GetallUsers } from "../../actions/adminuserActions";
import { clearUserError, clearOrderDeleted, cleardeleteerror } from "../../slices/userSlices";

export default function UserList() {
  const dispatch = useDispatch();

  const {
    users = [],
    loading,
    error,
    isuserdeleted,
  } = useSelector((state) => state.userState);

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(DeleteUser(id));
  };

  // Fetch users on mount
  useEffect(() => {
    dispatch(GetallUsers());
  }, [dispatch]);

  // Handle error toast
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-center" });
      dispatch(clearUserError());
    }
  }, [error, dispatch]);

  // Handle delete success
  useEffect(() => {
    if (isuserdeleted) {
      toast.success("User Deleted Successfully!!!", {
        position: "bottom-center",
      });
      dispatch(cleardeleteerror());
      dispatch(GetallUsers());
    }
  }, [isuserdeleted, dispatch]);

  // Build table data
  const data = useMemo(() => {
    return {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Email", field: "email", sort: "asc" },
        { label: "Role", field: "role", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary btn-sm"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              className="btn btn-danger btn-sm ml-2"
              onClick={(e) => deleteHandler(e, user._id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      })),
    };
  }, [users]);

  return (
    <div className="row">
      <MetaData title={"Users List"} />

      <div className="col-12 col-md-2">
        <Sidebar />
      </div>

      <div className="col-12 col-md-10">
        <h1 className="my-4">Users List</h1>
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
