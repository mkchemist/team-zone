import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import apiScheme from "../../../constant/api-scheme";
import HttpService from "../../../service/http-service";
import { startFetchingCalendars } from "../../../store/actions/calendar-actions";

function AddCalendar() {
  let history = useHistory()
  let dispatch = useDispatch()
  let formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      desc: Yup.string(),
    }),
    onSubmit: (values) => {
      HttpService.post(apiScheme.calendars, values)
      .then(({data}) => {
        Swal.fire({
          title: "Success",
          icon: "success",
          html : `Calendar ${values.title} created successfully`
        })
        dispatch(startFetchingCalendars())
        history.push("/calendars")
      }).catch(err => {
        console.log(err)
      })
    },
  });

  return (
    <div className="p-2">
      <h3>
        <span className="fa fa-plus-circle mr-1 text-success"></span>
        <span>New Calendar</span>
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Calendar title"
              className={`form-control form-control-sm ${
                formik.errors.title ? "border border-danger" : ""
              }`}
            />
            {formik.errors.title || formik.touched.title ? (
              <span className="text-danger small">{formik.errors.title}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea
              rows="5"
              type="text"
              id="desc"
              name="desc"
              onChange={formik.handleChange}
              value={formik.values.desc}
              placeholder="Calendar description"
              className={`form-control form-control-sm ${
                formik.errors.desc ? "border border-danger" : ""
              }`}
            ></textarea>
            {formik.errors.desc || formik.touched.desc ? (
              <span className="text-danger small">{formik.errors.desc}</span>
            ) : null}
          </div>
          <hr />
          <div className="form-group text-right">
            <button className="btn btn-sm btn-dark mr-1" type="button" onClick={e => history.goBack()}>
              <span className="fa fa-arrow-alt-circle-left mr-1"></span>
              <span>back</span>
            </button>
            <button className="btn btn-sm btn-primary" type="submit">
              <span className="fa fa-plus mr-1"></span>
              <span>Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCalendar;
