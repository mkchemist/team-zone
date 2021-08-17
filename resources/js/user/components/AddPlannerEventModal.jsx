import React from "react";
import PropTypes from "prop-types";
import ModalComponent from "../../components/ModalComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlanners } from "../../store/actions/planner-actions";
import HttpService from "../../service/http-service";
import apiScheme from "../../constant/api-scheme";
import { useParams } from "react-router-dom";
import { calendarRequest } from "../../store/actions/view-calendar";

const ModalHeader = () => (
  <div className="bg-primary text-light col-12 p-2">
    <p className="mb-0">
      <span className="fa fa-plus-circle mr-1"></span>
      <span>Add Event</span>
    </p>
  </div>
);

function AddPlannerEventModal({ show, onClose, start, end }) {
  let [planners, SetPlanners] = React.useState([]);
  let plannerStore = useSelector((state) => state.PlannerStore);
  let dispatch = useDispatch();
  let { id } = useParams();

  React.useEffect(() => {
    if (plannerStore.status === "idle") {
      dispatch(fetchPlanners());
    }
    SetPlanners(
      plannerStore.data.filter(
        (planner) => planner.calendar.id === parseInt(id)
      )
    );
  }, [plannerStore.status, id]);

  let formik = useFormik({
    initialValues: {
      title: "",
      start,
      end,
      allDay: false,
      planner_id: "",
      fav: false,
      who: '',
      where: '',
      content: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      start: Yup.date().required(),
      end: Yup.date().required(),
      allDay: Yup.bool(),
      planner_id: Yup.number().required(),
      fav: Yup.bool(),
    }),
    onSubmit: (values) => {
      HttpService.post(apiScheme.events, values)
        .then(({ data }) => {
          dispatch(
            calendarRequest({
              id,
            })
          );
          onClose();

          formik.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  React.useEffect(() => {
    let $updated = {
      ...formik.values,
      start,
      end,
    };
    formik.setValues($updated);
  }, [start, end]);

  return (
    <div>
      <ModalComponent
        show={show}
        onClose={onClose}
        id="add_planner_event_modal"
        HeaderComponent={ModalHeader}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row mx-auto mb-2">
            <div className="col">
              <label htmlFor="planner_id">Planner</label>
              <select
                name="planner_id"
                id="planner_id"
                className={`form-control form-control-sm ${
                  formik.errors.planner_id && formik.touched.planner_id
                    ? "border border-danger"
                    : ""
                }`}
                value={formik.values.planner_id}
                onChange={formik.handleChange}
              >
                <option value="">Select Planner</option>
                {planners.map((planner) => (
                  <option key={planner.id} value={planner.id}>
                    {planner.title}
                  </option>
                ))}
              </select>
              {formik.errors.planner_id && formik.touched.planner_id ? (
                <span className="text-danger small">planner required</span>
              ) : null}
            </div>
          </div>
          {/* Title and planner */}
          <div className="row mx-auto align-items-center mb-2">
            <div className="col form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Event Title"
                onChange={formik.handleChange}
                value={formik.values.title}
                className={`form-control form-control-sm ${
                  formik.errors.title && formik.touched.title
                    ? "border border-danger"
                    : ""
                }`}
              />
              {formik.errors.title && formik.touched.title ? (
                <span className="text-danger small">title required</span>
              ) : null}
            </div>

            <div className="col-auto form-group">
              <label htmlFor="">Favorite</label>
              <div>
                <input
                  type="checkbox"
                  name="fav"
                  id="fav"
                  value={formik.values.fav}
                  onChange={formik.handleChange}
                />

                <label htmlFor="fav" className="form-check-label mx-1">
                  {formik.values.fav === true ? "Yes" : "No"}
                </label>
              </div>
            </div>
          </div>
          {/* End of title and Planner */}
          {/* Start and End */}
          <div className="row mx-auto mb-2">
            <div className="col-6">
              <label htmlFor="start">Start</label>
              <input
                type="datetime-local"
                name="start"
                id="start"
                className="form-control form-control-sm"
                value={formik.values.start}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="end">End</label>
              <input
                type="datetime-local"
                name="end"
                id="end"
                className="form-control form-control-sm"
                value={formik.values.end}
                onChange={formik.handleChange}
                min={formik.values.start}
              />
            </div>
          </div>
          {/* end of start and end */}
          {/* who and where */}
          <div className="row mx-auto">
            <div className="col">
              <label htmlFor="">Who</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={formik.values.who}
                onChange={formik.handleChange}
                name="who"
                id="who"
              />
            </div>
            <div className="col">
              <label htmlFor="">Where</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={formik.values.where}
                onChange={formik.handleChange}
                name="where"
                id="where"
              />
            </div>
          </div>
          {/* end of who and where */}
          <div className="form-group p-2">
            <label htmlFor="">Content</label>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="5"
              className="form-control form-control-sm"
              placeholder="Enter content"
              value={formik.values.content}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          {/* controller */}
          <hr />
          <div className="text-right form-group">
            <button type="submit" className="btn btn-sm btn-primary">
              <span className="fa fa-plus mx-1"></span>
              <span>Add</span>
            </button>
            <button
              className="btn btn-sm btn-secondary mx-1"
              type="button"
              data-dismiss="modal"
            >
              <span className="fa fa-times mx-1"></span>
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </ModalComponent>
    </div>
  );
}

AddPlannerEventModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddPlannerEventModal;
