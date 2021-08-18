import { useFormik } from "formik";
import React from "react";
import BackButton from "../../../components/BackButton";
import apiScheme from "../../../constant/api-scheme";
import HttpService from "../../../service/http-service";
import * as Yup from "yup";
import Swal from "sweetalert2";

function ProfilePasswordPage() {
  let formik = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required(),
      password: Yup.string().required(),
      password_confirmation: Yup.string().required(),
    }),
    onSubmit: (values) => {
      HttpService.put(apiScheme.profile.changePassword, values)
        .then(() => {
          Swal.fire({
            title: "Success",
            text: "Password changed",
            icon: "success",
            toast: true,
          });
        })
        .catch((err) => {
          if (err.response.status === 403) {
            Swal.fire({
              title: "warning",
              text: err.response.data.message,
              icon: "warning",
              toast: true,
            });
          } else if (err.response.status === 422) {
            Swal.fire({
              title: "warning",
              text: "Two password is not match",
              icon: "warning",
              toast: true,
            });
          }else {
            Swal.fire({
              title: "Error",
              text: "Server Error",
              icon: "error",
              toast: true,
            });
          }
          formik.resetForm();
        });
    },
  });

  return (
    <div className="p-2">
      <p className="lead">
        <span className="fa fa-lock mr-1 text-primary"></span>
        <span>Change Password</span>
      </p>
      <div className="p-2">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="">Old Password</label>
            <input
              type="password"
              placeholder="Enter Old password"
              name="old_password"
              id="old_password"
              value={formik.values.old_password}
              onChange={formik.handleChange}
              className={`
              form-control form-control-sm
              ${
                formik.errors.old_password && formik.touched.old_password
                  ? "border border-danger"
                  : ""
              }
              `}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className={`
              form-control form-control-sm
              ${
                formik.errors.password && formik.touched.password
                  ? "border border-danger"
                  : ""
              }
              `}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password Confirmation</label>
            <input
              type="password"
              placeholder="Re-Enter password"
              name="password_confirmation"
              id="password_confirmation"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              className={`
              form-control form-control-sm
              ${
                formik.errors.password_confirmation &&
                formik.touched.password_confirmation
                  ? "border border-danger"
                  : ""
              }
              `}
            />
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

export default ProfilePasswordPage;
