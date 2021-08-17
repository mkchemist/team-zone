import React from "react";
import PropTypes from "prop-types";
import NoDataFound from "../../components/NoDataFound";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import HttpService from "../../service/http-service";
import apiScheme from "../../constant/api-scheme";
import { useDispatch } from "react-redux";
import { fetchPermissions } from "../../store/actions/permissions-actions";
import { defaultProfileImage, profileImage } from "../../utils/utils";

function PermissionsList({ data }) {
  let dispatch = useDispatch();

  const deletePermission = (permission) => {
    window.event.preventDefault();
    Swal.fire({
      title: "Warning",
      html: `
      <span class="small">Are you sure,
      if you delete this permission user <b class="text-danger">${permission.user.name}</b>
      will be unable to view planner <b class="text-danger">${permission.planner.title}</b>
      </span>`,
      icon: "warning",
      toast: true,
      showCancelButton: true,
      cancelButtonText: '<span class="fa fa-times"></span> Keep',
      confirmButtonText: `<span class="fa fa-trash"></span> Yes, delete`,
    }).then((res) => {
      if (res.isConfirmed) {
        let id = permission.id;
        HttpService.delete(apiScheme.permission.planners + `/${id}`)
          .then(({ data }) => {
            Swal.fire({
              title: "Success",
              text: "Permission deleted",
              icon: "success",
              toast: true,
              timer: 2000,
              timerProgressBar: true,
            });
            dispatch(fetchPermissions());
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div>
      {data.length ? (
        <div>
          <table className="table table-striped table-sm small">
            <thead>
              <tr>
                <th>Action</th>
                <th>User</th>
                <th>User Profile</th>
                <th>Calendar</th>
                <th>Planner</th>
                <th>Permission</th>
                <th>Planner Icon</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="dropdown">
                    <a
                      href=""
                      className="dropdown-toggle text-dark"
                      data-toggle="dropdown"
                    >
                      <span className="fa fa-wrench mr-1"></span>
                      <span>Action</span>
                    </a>
                    <div className="dropdown-menu">
                      <Link
                        to={`/friends/permissions/edit/${item.id}`}
                        className="dropdown-item small"
                      >
                        <span className="far fa-edit mr-1"></span>
                        <span>Edit</span>
                      </Link>
                      <a
                        href=""
                        className="dropdown-item small"
                        onClick={(e) => deletePermission(item)}
                      >
                        <span className="fa fa-trash mr-1"></span>
                        <span>Delete</span>
                      </a>
                    </div>
                  </td>
                  <td>{item.user.name}</td>
                  <td>
                    <img
                      src={
                        item.user.image
                          ? profileImage(item.user.image.url)
                          : defaultProfileImage()
                      }
                      alt={`${item.user.name} profile picture`}
                      className="icon-img"
                    />
                  </td>
                  <td>{item.calendar.title}</td>
                  <td>{item.planner.title}</td>
                  <td>{item.permission}</td>
                  <td>
                    <span className="fa fa-stack fa-2x">
                      <span
                        className="fa fa-stack-2x fa-circle"
                        style={{ color: item.planner.style.bg_color }}
                      ></span>
                      <span
                        className={`${item.planner.style.icon} fa-stack-1x`}
                        style={{ color: item.planner.style.color }}
                      ></span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">
          <NoDataFound text={`No permissions`} />
        </div>
      )}
    </div>
  );
}

PermissionsList.propTypes = {
  data: PropTypes.array,
};

export default PermissionsList;
