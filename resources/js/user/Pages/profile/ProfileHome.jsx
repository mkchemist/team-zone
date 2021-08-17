import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import * as Yup from "yup";

function ProfileHome() {
  let UserStore = useSelector((state) => state.UserStore);

  let formik = useFormik({
    initialValues: {
      name: UserStore.data.name,
      email: UserStore.data.email,
      gender: UserStore.data.gender,
      company: UserStore.data.company,
      phone: UserStore.data.phone,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      email: Yup.string().required("Email required"),
      gender: Yup.string().nullable(),
      company: Yup.string().nullable(),
      phone: Yup.number("Phone must be a valid phone number").nullable(),
    }),
    onSubmit: (values) => {
      console.log(values);
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
        <form>
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
              />
            </div>
            <div className="form-group col">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="User email"
                className="form-control form-control-sm"
              />
            </div>
            <div className="form-group col-auto">
              <label htmlFor="">Gender</label>
              <select
                name="gender"
                id="gender"
                className="form-control form-control-sm"
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
              />
            </div>
            <div className="form-group col">
              <label htmlFor="">Company</label>
              <input
                type="text"
                placeholder="Company"
                className="form-control form-control-sm"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="">Phone</label>
              <input
                type="number"
                placeholder="Phone number"
                className="form-control form-control-sm"
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
