import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import * as Yup from "yup";
import HttpService from "../../../service/http-service";
import apiScheme from "../../../constant/api-scheme";
import Swal from "sweetalert2";
import { refreshUserData } from "../../../store/actions/user-actions";

function ProfileHome() {
  let UserStore = useSelector((state) => state.UserStore);
  let dispatch = useDispatch()

  let formik = useFormik({
    initialValues: {
      name: UserStore.data.name,
      email: UserStore.data.email,
      gender: UserStore.data.gender || '',
      company: UserStore.data.company || '',
      phone: UserStore.data.phone || '',
      birth_date: UserStore.data.birth_date || ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      email: Yup.string().required("Email required").email("Email is not valid"),
      gender: Yup.string().required().oneOf(['male', 'female']),
      company: Yup.string().nullable(),
      phone: Yup.number("Phone must be a valid phone number").nullable(),
      birth_date: Yup.date().nullable()
    }),
    onSubmit: (values) => {
      HttpService.put(apiScheme.profile.updateProfile, values)
      .then(({data}) => {
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
          toast: true,
          timer: 3000,
          timerProgressBar: true
        })
        dispatch(refreshUserData());
      }).catch(err => console.log(err))
    },
  });

  return (
    <div className="p-2">
      <p className="lead">
        <span className="far fa-user mr-1 text-success"></span>
        <span>{UserStore.data.name} Profile</span>
      </p>
      <hr />
      <div className="p-2">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <p>
              Email verified{" "}
              <span className="fa fa-check-circle text-success"></span>
            </p>
          </div>
          <div className="row mx-auto">
            <div className="form-group col">
              <label htmlFor="">Name</label>
              {formik.errors.name || formik.touched.name ? (
                <span className="text-danger small">{formik.errors.name}</span>
              ) : null}
              <input
                type="text"
                placeholder="User name"
                className={`form-control form-control-sm ${
                  formik.errors.name && formik.touched.name
                    ? "border border-danger"
                    : ""
                }`}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="">Email</label>
              {formik.errors.email || formik.touched.email ? (
                <span className="text-danger small">{formik.errors.name}</span>
              ) : null}
              <input
                type="email"
                placeholder="User email"
                className={`form-control form-control-sm ${
                  formik.errors.email && formik.touched.email
                    ? "border border-danger"
                    : ""
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group col-auto">
              <label htmlFor="">Gender</label>
              {formik.errors.name || formik.touched.name ? (
                <span className="text-danger small">{formik.errors.name}</span>
              ) : null}
              <select
                name="gender"
                id="gender"
                className={`form-control form-control-sm ${
                  formik.errors.email && formik.touched.email
                    ? "border border-danger"
                    : ""
                }`}
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>
          <div className="row mx-auto">
            <div className="form-group col">
              <label htmlFor="">Date of birth</label>
              <input
                type="date"
                placeholder="Date of birth"
                className="form-control form-control-sm"
                value={formik.values.birth_date}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="">Company</label>
              <input
                type="text"
                placeholder="Company"
                className="form-control form-control-sm"
                value={formik.values.company}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="">Phone</label>
              <input
                type="number"
                placeholder="Phone number"
                className="form-control form-control-sm"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <hr />
          <div className="form-group text-right">
            <BackButton block={false} />
            <button type="submit" className="btn btn-sm btn-success mx-1">
              <span className="fa fa-save mx-1"></span>
              <span>Update</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileHome;
