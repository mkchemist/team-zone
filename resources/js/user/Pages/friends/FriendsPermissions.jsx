import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ErrorHandlingComponent from "../../../components/ErrorHandlingComponent";
import LoadingComponent from "../../../components/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound";
import SearchBox from "../../../components/SearchBox";
import apiScheme from "../../../constant/api-scheme";
import HttpService from "../../../service/http-service";
import { fetchPermissions } from "../../../store/actions/permissions-actions";
import {
  defaultProfileImage,
  imgUrl,
  profileImage,
} from "../../../utils/utils";
import PermissionModal from "../../components/PermissionModal";

const role = {
  calendar_id: "",
  user_id: "",
  can_read: false,
  can_create: false,
  can_edit: false,
  can_delete: false,
  can_restore: false,
};

function FriendsPermissions() {
  let [permissions, setPermissions] = React.useState([]);
  let [permission, setPermission] = React.useState(role);
  let [showModal, toggleModal] = React.useState(false);
  let [modalMode, setModalMode] = React.useState("create");
  let permissionsStore = useSelector((state) => state.PermissionsStore);
  let [searchKeyword, setSearchKeyword] = React.useState(null);
  let dispatch = useDispatch();
  function getFriendsPermissions(force = false) {
    if (permissionsStore.status === "idle" || force) {
      dispatch(fetchPermissions());
    }
    let friendsPermissions = permissionsStore.friendsPermissions;
    setPermissions(friendsPermissions);
  }

  useEffect(getFriendsPermissions, [permissionsStore.status]);

  useEffect(() => {
    let $permissions = permissions;

    if (searchKeyword && searchKeyword.trim() !== "") {
      $permissions = $permissions.filter((permission) => {
        return (
          permission.user.name
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          permission.calendar.title
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
        );
      });
      setPermissions($permissions);
    } else {
      setPermissions(permissionsStore.friendsPermissions);
    }
  }, [searchKeyword]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const openCreateModal = () => {
    setPermission(role);
    setModalMode("create");
    toggleModal(true);
  };

  const openEditModal = ($permission) => {
    setPermission($permission);
    setModalMode("edit");
    toggleModal(true);
  };

  const deletePermission = (permission) => {
    Swal.fire({
      title: "Warning",
      html: `<span class="small">Are you sure, you want to delete <b>${permission.user.name}</b> permissions on
          <b>${permission.calendar.title}</b> calendar</span>
        `,
      icon: "warning",
      toast: true,
      showCancelButton: true,
      confirmButtonText: `<span class="fa fa-trash"></span> Yes`,
      cancelButtonText: `<span class="fa fa-times"></span> No`,
    }).then((res) => {
      if (res.isConfirmed) {
        HttpService.delete(apiScheme.permission.calendars + `/${permission.id}`)
          .then(({ data }) => {
            Swal.fire({
              title: "success",
              html: `Permissions of <b>${permission.user.name}</b> on
            <b>${permission.calendar.title}</b> calendar has been canceled
          `,
              toast: true,
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
            });
            getFriendsPermissions(true)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="p-2">
      <p className="lead">
        <img
          src={imgUrl("permission.png")}
          alt="Permission icon"
          className="icon-img mr-1"
        />
        <span>Friends Permissions</span>
      </p>
      <hr />
      <div>
        <div className="row mx-auto">
          <SearchBox
            onSearch={handleSearch}
            placeholder={`Search friends permissions`}
          />
          <button
            className="btn btn-sm btn-primary"
            onClick={(e) => getFriendsPermissions(true)}
          >
            <span className="fa fa-sync mr-1"></span>
            <span>refresh</span>
          </button>
          <button
            className="btn btn-sm btn-success mx-1"
            onClick={openCreateModal}
          >
            <span className="fa fa-plus mr-1"></span>
            <span>add permission</span>
          </button>
        </div>
        <hr />
        <div className="my-2">
          {permissions.length ? (
            <div>
              <table className="table table-sm small table-striped">
                <thead>
                  <tr>
                    <th>Actions</th>
                    <th>Permission ID</th>
                    <th>User</th>
                    <th>Calendar</th>
                    <th>Can Read</th>
                    <th>Can Create</th>
                    <th>Can Edit</th>
                    <th>Can Delete</th>
                    <th>Can Restore</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((permission) => (
                    <tr key={permission.id}>
                      <td>
                        <button
                          className="btn btn-sm btn-warning mr-1"
                          onClick={(e) => openEditModal(permission)}
                        >
                          <span className="far fa-edit"></span>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={(e) => deletePermission(permission)}
                        >
                          <span className="fa fa-trash"></span>
                        </button>
                      </td>
                      <td>{permission.id}</td>
                      <td>
                        <img
                          src={
                            permission.user.image
                              ? profileImage(permission.user.image.url)
                              : defaultProfileImage()
                          }
                          alt=""
                          className="icon-img-sm"
                        />
                        <span>{permission.user.name}</span>
                      </td>
                      <td>{permission.calendar.title}</td>
                      <td>
                        {permission.can_read ? (
                          <span className="fa fa-check text-success"></span>
                        ) : (
                          <span className="fa fa-times text-danger"></span>
                        )}
                      </td>
                      <td>
                        {permission.can_create ? (
                          <span className="fa fa-check text-success"></span>
                        ) : (
                          <span className="fa fa-times text-danger"></span>
                        )}
                      </td>
                      <td>
                        {permission.can_edit ? (
                          <span className="fa fa-check text-success"></span>
                        ) : (
                          <span className="fa fa-times text-danger"></span>
                        )}
                      </td>
                      <td>
                        {permission.can_delete ? (
                          <span className="fa fa-check text-success"></span>
                        ) : (
                          <span className="fa fa-times text-danger"></span>
                        )}
                      </td>
                      <td>
                        {permission.can_restore ? (
                          <span className="fa fa-check text-success"></span>
                        ) : (
                          <span className="fa fa-times text-danger"></span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : permissionsStore.status === "succeeded" && !permissions.length ? (
            <NoDataFound />
          ) : permissionsStore.status === "failed" ? (
            <ErrorHandlingComponent />
          ) : (
            <LoadingComponent />
          )}
        </div>
      </div>
      {showModal && (
        <PermissionModal
          role={permission}
          show={showModal}
          mode={modalMode}
          onClose={(e) => toggleModal(false)}
          actionCallback={(e) => getFriendsPermissions(true)}
        />
      )}
    </div>
  );
}

export default FriendsPermissions;
