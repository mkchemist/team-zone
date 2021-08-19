import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorHandlingComponent from "../../../components/ErrorHandlingComponent";
import LoadingComponent from "../../../components/LoadingComponent";
import SearchBox from "../../../components/SearchBox";
import { imgUrl } from "../../../utils/utils";
import MassPermissionAssignment from "../../components/MassPermissionAssignment";
import PermissionsList from "../../components/PermissionsList";

export default function FriendsPermissionsHome() {

  let dispatch =useDispatch();
  let permissionStore = useSelector(state => state.PermissionsStore);
  let [permissions, setPermissions] = useState([]);
  let [search, setSearch] = useState(null)
  const fetchPermissions = () => {
    dispatch(fetchPermissions());
  }


  useEffect(() => {
    let $permissions = permissionStore.friendsPermissions;
    if(search) {
      $permissions = $permissions.filter(p => p.user.name.toLowerCase().includes(search.toLowerCase()))
    }
    setPermissions($permissions);
  }, [permissionStore.status, search]);


  const handleSearch = (keyword) => {
    setSearch(keyword)
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
        <MassPermissionAssignment />
        <button
          className="btn btn-sm btn-light border"
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
