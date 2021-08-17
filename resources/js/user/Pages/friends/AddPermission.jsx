import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import friendsPermission from "../../../constant/friends-permission";
import { fetchPlanners } from "../../../store/actions/planner-actions";
import * as Yup from "yup"
import HttpService from "../../../service/http-service";
import apiScheme from "../../../constant/api-scheme";
import Swal from "sweetalert2";
import { fetchPermissions } from "../../../store/actions/permissions-actions";

function AddPermission() {
  let calendarsStore = useSelector(state => state.CalendarStore);
  let [calendars, setCalendars] = useState([]);
  let friendsStore = useSelector(state => state.FriendsStore);
  let user = useSelector(state => state.UserStore.data);
  let [friends, setFriends] = useState([]);
  let plannerStore = useSelector(state =>state.PlannerStore);
  let [planners, setPlanners] = useState([]);
  let permissionStore = useSelector(state => state.PermissionsStore);
  let dispatch = useDispatch();

  useEffect(() => {
    let $cal = calendarsStore.data.filter(cal => {
      return cal.user.id === user.id
    })
    setCalendars($cal);
  }, [calendarsStore.status]);

  useEffect(() => {
    setFriends(friendsStore.data);
  }, [friendsStore.status]);



  let formik = useFormik({
    initialValues: {
      user_id: "",
      calendar_id: "",
      planner_id: "",
      permission: "",
    },
    validationSchema: Yup.object({
      user_id: Yup.number().required(),
      calendar_id: Yup.number().required(),
      planner_id: Yup.number().required(),
      permission: Yup.string().required(),
    }),
    onSubmit: values => {
      HttpService.post(apiScheme.permission.planners, values)
      .then(({data}) => {
        Swal.fire({
          title : 'Success',
          text: data.message,
          icon: 'success',
          toast: true,
          timer: 2000,
          timerProgressBar: true
        })
        dispatch(fetchPermissions());
      }).catch(err => {
        console.log(err)
      })
    }
  });

  useEffect(() => {
    if(plannerStore.status === 'idle') {
      dispatch(fetchPlanners());
    }
    let $planners = plannerStore.data;
    if(formik.values.calendar_id) {
      $planners = $planners.filter(planner => planner.calendar.id === parseInt(formik.values.calendar_id))
    }
    setPlanners($planners);
  }, [formik.values.calendar_id, plannerStore.status])

  return (
    <div>
      <p className="lead">
        <span className="far fa-user mr-1 text-success"></span>
        <span>Add permission</span>
      </p>
      <hr />
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="">Friend</label>
            {formik.touched.user_id && formik.errors.user_id ? (
              <span className="text-danger small mx-1">
                you must select a friend
              </span>
            ) : null}
            <select
              name="user_id"
              id="user_id"
              className={`form-control form-control-sm col-lg-5 ${
                formik.errors.user_id && formik.touched.user_id
                  ? "border border-danger"
                  : ""
              }`}
              onChange={formik.handleChange}
              value={formik.values.user_id}
            >
              <option value="">Select friend</option>
              {friends.map(friend => (
                <option key={friend.id} value={friend.id}>{friend.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Calendar</label>
            {formik.touched.calendar_id && formik.errors.calendar_id ? (
              <span className="text-danger small mx-1">
                you must select a calendar
              </span>
            ) : null}
            <select
              name="calendar_id"
              id="calendar_id"
              className={`form-control form-control-sm col-lg-5 ${
                formik.errors.calendar_id && formik.touched.calendar_id
                  ? "border border-danger"
                  : ""
              }`}
              onChange={formik.handleChange}
              value={formik.values.calendar_id}
            >
              <option value="">Select calendar</option>
              {calendars.map(calendar => (
                <option key={calendar.id} value={calendar.id}>{calendar.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Planner</label>
            {formik.touched.planner_id && formik.errors.planner_id ? (
              <span className="text-danger small mx-1">
                you must select a planner
              </span>
            ) : null}
            <select
              name="planner_id"
              id="planner_id"
              className={`form-control form-control-sm col-lg-5 ${
                formik.errors.planner_id && formik.touched.planner_id
                  ? "border border-danger"
                  : ""
              }`}
              onChange={formik.handleChange}
              value={formik.values.planner_id}
              disabled={!formik.values.calendar_id}
            >
              <option value="">Select planner</option>
              {planners.map(planner => (
                <option key={planner.id} value={planner.id}>{planner.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Permission</label>
            {formik.touched.permission && formik.errors.permission ? (
              <span className="text-danger small mx-1">
                you must select a permission
              </span>
            ) : null}
            <select
              name="permission"
              id="permission"
              className={`form-control form-control-sm col-lg-5 ${
                formik.errors.permission && formik.touched.permission
                  ? "border border-danger"
                  : ""
              }`}
              onChange={formik.handleChange}
              value={formik.values.permission}
            >
              <option value="">Select permission</option>
              {friendsPermission.map((permission,index) => (
                <option key={`permission_${index}`} value={permission}>{permission}</option>
              ))}
            </select>
          </div>
          <hr />
          <div className="form-group">
            <BackButton block={false} />
            <button className="btn btn-sm btn-primary mx-1" type="submit">
              <span className="fa fa-save mr-1"></span>
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPermission;
