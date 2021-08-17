import { useFormik } from "formik";
import React from "react";
import { getQuerySearch, imgUrl } from "../../../utils/utils";
import AddPlannerStyleBox from "../../components/AddPlannerStyleBox";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import HttpService from "../../../service/http-service";
import apiScheme from "../../../constant/api-scheme";
import Swal from "sweetalert2";
import { fetchPlanners } from "../../../store/actions/planner-actions";
import BackButton from "../../../components/BackButton";
import { useHistory, useLocation } from "react-router-dom";
import LoadingComponent from "../../../components/LoadingComponent";

function AddPlanner() {
  let [style, setStyle] = React.useState(null);
  let calendarsStore = useSelector((state) => state.CalendarStore);
  let dispatch = useDispatch();
  let [calendars, setCalendars] = React.useState([]);
  let location = useLocation();
  let history = useHistory()
  let user = useSelector(state => state.UserStore.data)

  let formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      calendar_id: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      calendar_id: Yup.string().required(),
      desc: Yup.string().nullable(),
    }),
    onSubmit: (values) => {
      let data = { ...values, ...style };
      HttpService.post(apiScheme.planners, data)
        .then(({ data }) => {
          Swal.fire({
            title: "Success",
            html: `Planner ${values.title} created successfully`,
            icon: "success",
            timer: 5000,
            toast: true,
            timerProgressBar: true,
          });
          dispatch(fetchPlanners());
          history.push("/planners")
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  function getPlannerStyle(values) {
    setStyle(values);
  }

  React.useEffect(() => {
    let cals = calendarsStore.data;
    cals = cals.filter(cal => cal.user.id === user.id)
    setCalendars(cals);
  }, [calendarsStore.status, location]);

  return (
    <div className="p-2">
      <p className="lead">
        <img
          src={imgUrl("calendar-plus.png")}
          alt="add planner"
          className="icon-img mr-1"
        />
        <span className="font-weight-bold">Add Planner</span>
      </p>
      <hr />
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row mx-auto mb-3">
            <div className="col">
              <label htmlFor="calendar_id">Calendar</label>
              <select
                name="calendar_id"
                id="calendar_id"
                className={`form-control form-control-sm ${
                  formik.errors.calendar_id ? "border border-danger" : ""
                }`}
                onChange={formik.handleChange}
                value={formik.values.calendar_id}
              >
                <option value="">Select Calendar</option>
                {calendars.map((cal) => (
                  <option key={cal.id} value={cal.id}>
                    {cal.title}
                  </option>
                ))}
              </select>
              {formik.errors.calendar_id && (
                <span className="text-danger small">Calendar Required</span>
              )}
            </div>
            <div className="col">
              <label htmlFor="title">Title</label>
              <input
                type="title"
                id="title"
                name="title"
                className={`form-control form-control-sm`}
                placeholder="Planner title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik.errors.title && formik.touched.title ? (
                <span className="text-danger small">title Required</span>
              ) : null}
            </div>
          </div>
          <AddPlannerStyleBox onUpdate={getPlannerStyle} />
          <div className="form-group px-2 my-3">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="5"
              className="form-control form-control-ms"
              placeholder="Planner description"
              value={formik.values.desc}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          <hr />
          <div className="form-group text-right">
            {/* <button className="btn btn-dark mx-1" type="button">
              <span className="fa fa-arrow-alt-circle-left mx-1"></span>
              <span>back</span>
            </button> */}
            <BackButton block={false} size={""} />
            <button className="btn btn-primary mx-1" type="submit">
              <span className="fa fa-save mx-1"></span>
              <span>Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPlanner;
