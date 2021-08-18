import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../components/ModalComponent";
import { startFetchingCalendars } from "../../store/actions/calendar-actions";
import { fetchFriends } from "../../store/actions/friends-actions";
import * as Yup from "yup";
import { fetchPlanners } from "../../store/actions/planner-actions";
import friendsPermission from "../../constant/friends-permission";
import Swal from "sweetalert2";
import HttpService from "../../service/http-service";
import apiScheme from "../../constant/api-scheme";
import { fetchPermissions } from "../../store/actions/permissions-actions";

function MassPermissionAssignment() {
  let [showModal, toggleModal] = React.useState(false);
  let friends = useSelector((state) => state.FriendsStore);
  let calendars = useSelector((state) => state.CalendarStore);
  let [userCalendars, setUsersCalenders] = React.useState([]);
  let planners = useSelector((state) => state.PlannerStore);
  let [calendarPlanners, setCalendarPlanners] = React.useState([]);
  let user = useSelector((state) => state.UserStore);
  let dispatch = useDispatch();
  let [users, setUsers] = React.useState([])
  let formik = useFormik({
    initialValues: {
      calendar_id: "",
      planner_id: "",
      permission: "",
    },
    validationSchema: Yup.object({
      calendar_id: Yup.number().required(),
      planner_id: Yup.number().required(),
      permission: Yup.string().required(),
    }),
    onSubmit: (values) => {
      if(!users.length) {
        Swal.fire({
          title: 'Warning',
          text: 'You didn\'t select any friend',
          icon: 'warning',
          toast: true
        })
        return;

      }
      let query = {
        ...values,
        users: JSON.stringify(users)
      }
      HttpService.post(apiScheme.permission.massAssign, query)
      .then(({data}) => {
        Swal.fire({
          title: 'Success',
          text: data.message,
          icon: 'success',
          toast: true,
          timer: 2000,
          timerProgressBar: true
        })

        dispatch(fetchPermissions())
      }).catch(err => console.log(err))
    },
  });

  useEffect(() => {
    if (calendars.status === "idle") {
      dispatch(startFetchingCalendars());
    }
    let cals = calendars.data.filter((cal) => cal.user.id === user.data.id);
    console.log(cals);
    setUsersCalenders(cals);
  }, [calendars.status]);

  useEffect(() => {
    if (friends.status === "idle") {
      dispatch(fetchFriends());
    }
  }, [friends.status]);

  useEffect(() => {
    if (planners.status === "idle") {
      dispatch(fetchPlanners());
    }
    let $planners = planners.data.filter(
      (planner) => planner.calendar.id === parseInt(formik.values.calendar_id)
    );
    setCalendarPlanners($planners);
  }, [planners.status, formik.values.calendar_id]);

  const handleUsersChange = (e) => {
    let $users = users;
    let $id = parseInt(e.target.value)
    if(e.target.checked) {
      if(!$users.includes($id)) {
        $users.push($id)
      }
    } else {
      if($users.includes($id)) {
        let index = $users.indexOf($id)
        $users = $users.splice(index, 1);
      }
    }

    setUsers($users);

  }

  return (
    <>
      <button
        className="btn btn-sm btn-light border mx-1"
        onClick={(e) => toggleModal(true)}
      >
        <span className="fa fa-users-cog mr-1"></span>
        <span>Mass Assignment</span>
      </button>
      <ModalComponent
        id="permission_mass_assignment"
        show={showModal}
        onClose={(e) => toggleModal(false)}
      >
        <>
          <p className="lead">Permission mass assignment</p>
          <hr />
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
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
                >
                  <option value="">select calendar</option>
                  {userCalendars.length ? (
                    <>
                      {userCalendars.map((cal) => (
                        <option key={cal.id} value={cal.id}>
                          {cal.title}
                        </option>
                      ))}
                    </>
                  ) : null}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Planner</label>
                <select
                  name="planner_id"
                  id="planner_id"
                  value={formik.values.planner_id}
                  onChange={formik.handleChange}
                  className={`form-control form-control-sm ${
                    formik.errors.planner_id && formik.touched.planner_id
                      ? "border border-danger"
                      : ""
                  }`}
                >
                  <option value="">select planner</option>
                  {calendarPlanners.length ? (
                    <>
                      {calendarPlanners.map((cal) => (
                        <option key={cal.id} value={cal.id}>
                          {cal.title}
                        </option>
                      ))}
                    </>
                  ) : null}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="">Permission</label>
                <select
                  name="permission"
                  id="permission"
                  value={formik.values.permission}
                  onChange={formik.handleChange}
                  className={`form-control form-control-sm ${
                    formik.errors.permission && formik.touched.permission
                      ? "border border-danger"
                      : ""
                  }`}
                >
                  <option value="">select planner</option>
                  {friendsPermission.map((cal, i) => (
                    <option key={`permission_${i}`} value={cal}>
                      {cal}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Friends</label>
                <ul className="nav col-12 border p-2" style={{ height:100 ,overflow: 'auto' }}>
                  {friends.data.map((friend) => (
                    <li key={friend.id} className="col-4 nav-item">
                      <input
                        type="checkbox"
                        value={friend.id}
                        onChange={handleUsersChange}
                      />
                      <label htmlFor="" className="small mx-1">
                        {friend.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div className="form-group text-right">
                <button className="btn btn-sm btn-primary" type="submit">
                  <span className="fa fa-plus mr-1"></span>
                  <span>Assign</span>
                </button>
                <button
                  className="btn btn-sm btn-dark mx-1"
                  data-dismiss="modal"
                  type="button"
                >
                  <span className="fa fa-times mr-1"></span>
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </>
      </ModalComponent>
    </>
  );
}

export default MassPermissionAssignment;
