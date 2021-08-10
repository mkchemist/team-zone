import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorHandlingComponent from "../../../components/ErrorHandlingComponent";
import LoadingComponent from "../../../components/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound";
import { fetchPlanners } from "../../../store/actions/planner-actions";
import { imgUrl } from "../../../utils/utils";
import * as Yup from "yup";
import { startCalendarRequest } from "../../../store/actions/calendar-actions";
import AddPlannerStyleBox from "../../components/AddPlannerStyleBox";
import BackButton from "../../../components/BackButton";
import HttpService from "../../../service/http-service";
import apiScheme from "../../../constant/api-scheme";
import Swal from "sweetalert2";

function EditPlanner() {
  {
  }
  let { id } = useParams();
  let [planner, setPlanner] = React.useState(null);
  let plannerStore = useSelector((state) => state.PlannerStore);
  let dispatch = useDispatch();
  let calendarStore = useSelector((state) => state.CalendarStore);
  let formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      calendar_id: "",
    },
    validationSchema: Yup.object({
      calendar_id: Yup.number().required(),
      title: Yup.string().required(),
      desc: Yup.string().nullable(),
    }),
    onSubmit: (values) => {
      let data = {
        ...values,
        bg_color: planner.style.backgroundColor,
        color: planner.style.color,
        icon: planner.style.icon
      };
      HttpService.put(`${apiScheme.planners}/${id}`, data)
      .then(({data}) => {
        Swal.fire({
          title: "Success",
          html: `Planner ${values.title} updated successfully`,
          icon: "success",
          timer: 5000,
          timerProgressBar: true,
          toast: true
        })
        dispatch(fetchPlanners())
      }).catch(err => {
        console.log(err)
      })
    },
  });

  React.useEffect(() => {
    if (calendarStore.status === "idle") {
      dispatch(startCalendarRequest());
    }
  }, [calendarStore.status]);

  React.useEffect(() => {
    if (plannerStore.status === "idle") {
      dispatch(fetchPlanners());
    }
  }, [plannerStore.status]);

  React.useEffect(() => {
    let $matchPlanners = plannerStore.data.filter((i) => i.id === parseInt(id));
    if ($matchPlanners) {
      setPlanner(_.cloneDeep($matchPlanners[0]));
    }
  }, [plannerStore.status]);

  React.useEffect(() => {
    if (planner) {
      formik.setValues({
        calendar_id: planner.calendar.id,
        title: planner.title,
        desc: planner.desc,
      });
    }
  }, [planner]);

  const onUpdatePlannerStyle = (values) => {
    if (planner) {
      let $planner = planner;
      $planner.style = {
        backgroundColor: values.bg_color,
        color: values.color,
        icon: values.icon,
      };

      setPlanner($planner);
    }
  };

  return (
    <div className="p-2">
      <p className="lead">
        <img
          src={imgUrl("planner-box.png")}
          alt="Edit Planner"
          className="icon-img mr-1"
        />
        <span>
          Edit Planner <b>{planner ? planner.title : ""}</b>
        </span>
      </p>
      <hr />
      {planner ? (
        <div className="my-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="row mx-auto">
              <div className="form-group col">
                <label htmlFor="calendar_id">Calendar</label>
                <select
                  name="calendar_id"
                  id="calendar_id"
                  className={`form-control-sm form-control ${
                    formik.errors.calendar_id ? "border border-danger" : ""
                  }`}
                  value={formik.calendar_id}
                  defaultValue={planner.calendar.id}
                >
                  <option value="">Select Calendar</option>
                  {calendarStore.data.map((cal) => (
                    <option key={cal.id} value={cal.id}>
                      {cal.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <AddPlannerStyleBox
              onUpdate={onUpdatePlannerStyle}
              defaultStyle={{
                bg_color: planner.style.backgroundColor,
                color: planner.style.color,
                icon: planner.style.icon,
              }}
            />
            <div className="px-2 form-group">
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="5"
                className="form-control from-control-sm"
                value={formik.values.desc || ""}
                onChange={formik.handleChange}
              ></textarea>
            </div>
            <div className="form-group  text-right">
              <BackButton block={false} size={""} />
              <button className="btn  btn-success mx-1" type="submit">
                <span className="far fa-save mr-1"></span>
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
      ) : plannerStore.status === "succeeded" && !plannerStore.data.length ? (
        <NoDataFound />
      ) : plannerStore.status === "failed" ? (
        <ErrorHandlingComponent />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}

export default EditPlanner;
