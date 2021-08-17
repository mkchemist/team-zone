import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import apiScheme from "../../../constant/api-scheme";
import HttpService from "../../../service/http-service";
import { startFetchingCalendars } from "../../../store/actions/calendar-actions";

function EditCalendar() {
  let { id } = useParams();
  let calendarStore = useSelector((state) => state.CalendarStore);
  let [calendar, setCalendar] = React.useState(null);
  let dispatch = useDispatch();
  let history = useHistory();
  let formik = useFormik({
    initialValues: {
      title: calendar ? calendar.title : "",
      desc: calendar ? calendar.desc : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      desc: Yup.string().nullable(),
    }),
    onSubmit: (values) => {
      let {id, title, desc} = values;
      HttpService.put(apiScheme.calendars+`/${id}`, {title, desc})
      .then(({data}) => {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: data.message,
          toast: true,
          timer: 5000,
          timerProgressBar: true,
          confirmButtonText: `<span class="fa fa-check-circle"></span> okay`
        })
        dispatch(startFetchingCalendars());
      }).catch(err => {
        console.log(err)
      })
    },
  });
  function getSelectedCalendar() {
    let matchedCalendar = calendarStore.data.filter(
      (item) => item.id === parseInt(id)
    );

    if (matchedCalendar.length) {
      let calendar = matchedCalendar[0];
      setCalendar(calendar);
    }
  }

  function setFormikInitialValues() {
    if (calendar) {
      formik.setValues(calendar);
    }
  }

  React.useEffect(() => {
    getSelectedCalendar();
  }, [calendarStore.status]);

  React.useEffect(() => {
    setFormikInitialValues();
  }, [calendar]);

  if (!calendar) {
    return (
      <div className="p-5 text-center">
        <div className="d-flex flex-column align-items-center">
          <div className="spinner-grow"></div>
          <p className="text-muted">loading</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="lead">
        <span className="far fa-edit mx-1 text-success"></span>
        <span>Edit {calendar.title}</span>
      </p>
      <hr />
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Calendar title"
            className={`form-control form-control-sm ${
              formik.errors.title ? "border border-danger" : ""
            }`}
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title && (
            <span className="text-danger small">{formik.errors.title}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="8"
            placeholder="Calendar description"
            onChange={formik.handleChange}
            value={formik.values.desc || ""}
            className={`form-control form-control-sm ${
              formik.errors.desc ? "border border-danger" : ""
            }`}
          ></textarea>
        </div>
        <hr />
        <div className="form-group text-right">
            <button className="btn btn-sm btn-dark" type="button" onClick={e => history.goBack()}>
              <span className="fa fa-arrow-alt-circle-left mx-1"></span>
              <span>Back</span>
            </button>
            <button className="btn btn-sm btn-success mx-1">
              <span className="fa fa-save  mx-1"></span>
              <span>Save</span>
            </button>
        </div>
      </form>
    </div>
  );
}

export default EditCalendar;
