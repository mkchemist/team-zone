import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ModalComponent from "../../components/ModalComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../store/actions/friends-actions";
import { startFetchingCalendars } from "../../store/actions/calendar-actions";
import HttpService from "../../service/http-service";
import apiScheme from "../../constant/api-scheme";
import Swal from "sweetalert2";

function PermissionModal({ show, onClose, role, actionCallback, mode }) {
  let friendsStore = useSelector((state) => state.FriendsStore);
  let calendarStore = useSelector((state) => state.CalendarStore);
  let user = useSelector(state => state.UserStore.data);
  let [calendars, setCalendars] = useState([])
  let dispatch = useDispatch();
  let formik = useFormik({
    initialValues: role,
    validationSchema: Yup.object({
      calendar_id: Yup.number().required(),
      user_id: Yup.number().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      let url =apiScheme.permission.calendars;
      let method = 'post'
      if(mode === "edit") {
        url = url + `/${role.id}`
        method = 'put'
      }

      HttpService[method](url, values)
      .then(({data}) => {
        Swal.fire({
          title: "Success",
          text: "action completed",
          icon: "success",
          toast: true,
          timer: 3000,
          timerProgressBar: true
        })
        actionCallback()
      })
      .catch(err => {
        console.log(err)
      })
    },
  });



  useEffect(() => {
    if (friendsStore.status === "idle") {
      dispatch(fetchFriends());
    }
  }, [friendsStore.status]);

  useEffect(() => {
    if (calendarStore.status === "idle") {
      dispatch(startFetchingCalendars());
    }

    let $cal = calendarStore.data.filter(cal => cal.user.id === user.id);

    setCalendars($cal)

  }, [calendarStore.status]);



  return (
    <div>
      <ModalComponent show={show} onClose={e => onClose()} id={"permission_modal"}>
        <form onSubmit={formik.handleSubmit}>
          {/*  calendar and user */}
          <div className="row mx-auto px-0 mb-3">
            {/* calendar */}
            <div className="col px-0">
              <label htmlFor="">Calendar</label>
              <select
                name="calendar_id"
                id="calendar_id"
                value={formik.values.calendar_id}
                onChange={formik.handleChange}
                className={`form-control form-control-sm ${
                  formik.errors.calendar_id && formik.touched.calendar_id
                    ? "border border-danger"
                    : ""
                }`}
                disabled={mode === "edit"}
              >
                <option value="">Select Calendar</option>
                {calendars.map((calendar) => (
                  <option key={calendar.id} value={calendar.id}>
                    {calendar.title}
                  </option>
                ))}
              </select>
            </div>
            {/* user */}
            <div className="col">
              <label htmlFor="">Friends</label>
              <select
                name="user_id"
                id="user_id"
                defaultValue={formik.values.user_id}
                onChange={formik.handleChange}
                className={`form-control form-control-sm ${
                  formik.errors.user_id && formik.touched.user_id
                    ? "border border-danger"
                    : ""
                }`}
                disabled={mode === "edit"}

              >
                <option value="">Select Friend</option>
                {friendsStore.data.map((friend) => (
                  <option key={friend.id} value={friend.id}>
                    {friend.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* end of calendar and user */}
          {/* permissions */}
          <div className="form-group">
            <label htmlFor="">Permissions</label>
            <div>
              <input
                type="checkbox"
                value={formik.can_read}
                onChange={formik.handleChange}
                name="can_read"
                checked={formik.values.can_read}
              />
              <label htmlFor="" className="ml-1 small form-check-inline">
                can read
              </label>
              <input
                type="checkbox"
                value={formik.values.can_create}
                onChange={formik.handleChange}
                name="can_create"
                checked={formik.values.can_create}
              />
              <label htmlFor="" className="ml-1 small form-check-inline">
                can create
              </label>
              <input
                type="checkbox"
                value={formik.can_edit}
                onChange={formik.handleChange}
                name="can_edit"
                checked={formik.values.can_edit}
              />
              <label htmlFor="" className="ml-1 small form-check-inline">
                can edit
              </label>
              <input
                type="checkbox"
                value={formik.can_delete}
                onChange={formik.handleChange}
                name="can_delete"
                checked={formik.values.can_delete}
              />
              <label htmlFor="" className="ml-1 small form-check-inline">
                can delete
              </label>
              <input
                type="checkbox"
                value={formik.can_restore}
                onChange={formik.handleChange}
                name="can_restore"
                checked={formik.values.can_restore}
              />
              <label htmlFor="" className="ml-1 small form-check-inline">
                can restore
              </label>
            </div>
          </div>
          {/* end of permissions */}
          {/* controller */}
          <hr />
          <div className="form-group text-right">
            <button
              className="btn btn-sm btn-secondary"
              data-dismiss="modal"
              type="button"
            >
              <span className="fa fa-times mr-1"></span>
              <span>close</span>
            </button>
            <button className="btn btn-sm btn-success mx-1" type="submit">
              <span className={mode === 'create' ? "fa fa-plus mr-1" : "fa fa-save mr-1"}></span>
              <span>{mode === "create" ? 'add' : 'update'}</span>
            </button>
          </div>
          {/* end of controller */}
        </form>
      </ModalComponent>
    </div>
  );
}


PermissionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  role: PropTypes.object,
  mode: PropTypes.string.isRequired,
  actionCallback: PropTypes.func
};

export default PermissionModal;
