import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorHandlingComponent from "../../../components/ErrorHandlingComponent";
import LoadingComponent from "../../../components/LoadingComponent";
import SearchBox from "../../../components/SearchBox";
import { imgUrl } from "../../../utils/utils";
import PermissionsList from "../../components/PermissionsList";

export default function FriendsPermissionsHome() {

  let dispatch =useDispatch();
  let permissionStore = useSelector(state => state.PermissionsStore);
  let [permissions, setPermissions] = useState([]);
  const fetchPermissions = () => {
    dispatch(fetchPermissions());
  }


  useEffect(() => {
    setPermissions(permissionStore.friendsPermissions);
  }, [permissionStore.status]);


  const handleSearch = (keyword) => {
    console.log(keyword);
  };
  return (
    <div className="p-2">
      <p className="lead">
        <img
          src={imgUrl("permission.png")}
          alt="Permission icon"
          className="icon-img mr-1"
        />
        <span>Friends permission</span>
      </p>
      <hr />
      <div className="row mx-auto">
        <SearchBox onSearch={handleSearch} />
        <Link
          to="/friends/permissions/add"
          className="btn btn-sm btn-light border"
          title="add new permission to a friend"
        >
          <span className="fa fa-plus mr-1"></span>
          <span>Add permission</span>
        </Link>
        <button
          className="btn btn-sm btn-light border mx-1"
          title="refresh page"
        >
          <span className="fa fa-sync-alt mr-1"></span>
          <span>Refresh</span>
        </button>
      </div>
      <hr />
      <div className="p-2">
        {permissionStore.status === 'succeeded' && (
          <PermissionsList data={permissions} />
        )}
        {permissionStore.status === 'loading' && (
          <LoadingComponent />
        )}
        {permissionStore.status === 'failed' && (
          <ErrorHandlingComponent />
        )}
      </div>
    </div>
  );
}
