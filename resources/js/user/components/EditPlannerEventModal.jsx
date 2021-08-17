import React from "react";
import PropTypes from "prop-types";
import ModalComponent from "../../components/ModalComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import HttpService from "../../service/http-service";
import apiScheme from "../../constant/api-scheme";
import { useDispatch } from "react-redux";
import { calendarRequest } from "../../store/actions/view-calendar";
import moment from "moment";

const ModalHeader = () => (
  <div className="p-2 col-12 bg-warning text-dark">
    <p className="mb-0">
      <span className="far fa-edit mr-1"></span>
      <span>Edit Event</span>
    </p>
  </div>
);

function EditPlannerEventModal(props) {
  let [event, setEvent] = React.useState(props.event);
  let dispatch = useDispatch();
  let formik = useFormik({
    initialValues: {
      start: moment(props.event.start).format("YYYY-MM-DDThh:mm"),
      end: moment(props.event.end).format("YYYY-MM-DDThh:mm"),
      allDay: props.event.allDay,
      fav: props.event.fav,
      who: props.event.who || '',
      where: props.event.where || '',
      content: props.event.content || ''
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      HttpService.put(apiScheme.events + `/${event.id}`, {
        title: event.title,
        start: values.start,
        end: values.end,
        allDay: values.allDay,
        fav: values.fav,
        who: values.who,
        where: values.where,
        content: values.content
      })
        .then(({ data }) => {
          Swal.fire({
            title: "Success",
            html: `Event <b class="text-danger">${event.title}</b> updated`,
            icon: "success",
            toast: true,
            timer: 5000,
            timerProgressBar: true,
          });
          dispatch(
            calendarRequest({
              id: event.calendar.id,
            })
          );
          props.onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  React.useEffect(() => {
    setEvent({});
    console.log(props.event)
    setEvent(props.event);
    let updatedFormikValues = {
      ...formik.values,
      start: moment(props.event.start).format("YYYY-MM-DDThh:mm"),
      end: moment(props.event.end).format("YYYY-MM-DDThh:mm"),
      allDay: props.event.allDay,
      fav: props.event.fav,
      who: props.event.who || '',
      where: props.event.where || '',
      content: props.event.content || ''
    };
    formik.setValues(updatedFormikValues);
  }, [props.event]);

  const deleteEvent = () => {
    Swal.fire({
      title: "Warning",
      html: `Are you sure, you want to delete <b class="text-danger">${event.title}</b>?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Keep",
      confirmButtonColor: "#f14e4a",
      confirmButtonText: `<span class="fa fa-trash"></span> Yes, delete`,
    }).then((res) => {
      if (res.isConfirmed) {
        HttpService.delete(apiScheme.events + `/${event.id}`)
          .then(({ data }) => {
            Swal.fire({
              title: "Success",
              html: `Event <b class="text-danger">${event.title}</b> Deleted`,
              icon: "success",
              toast: true,
              timer: 5000,
              timerProgressBar: true,
            });
            dispatch(
              calendarRequest({
                id: event.calendar.id,
              })
            );
            props.onClose();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <ModalComponent
        show={props.show}
        onClose={props.onClose}
        id="edit_planner_event_modal"
        HeaderComponent={ModalHeader}
      >
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="row mx-auto mb-2">
              <div className="col">
                <label htmlFor="planner_id">Planner</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={event.planner.title}
                  disabled
                />
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
                  value={event.title}
                  className={`form-control form-control-sm`}
                  disabled
                />
              </div>
              {/* <div className="col-auto form-group">
                <label htmlFor="">All Day</label>
                <div>
                  <input
                    type="checkbox"
                    name="allDay"
                    id="allDay"
                    value={formik.values.allDay}
                    onChange={formik.handleChange}
                  />

                  <label htmlFor="allDay" className="form-check-label mx-1">
                    {formik.values.allDay === true ? "Yes" : "No"}
                  </label>
                </div>
              </div> */}
              <div className="col-auto form-group">
                <label htmlFor="">Favorite</label>
                <div>
                  <input
                    type="checkbox"
                    name="fav"
                    id="fav"
                    value={formik.values.fav}
                    onChange={formik.handleChange}
                    checked={formik.values.fav === true}
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
              <button type="submit" className="btn btn-sm btn-warning">
                <span className="far fa-edit mx-1"></span>
                <span>Save</span>
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger mx-1"
                onClick={deleteEvent}
              >
                <span className="fa fa-trash mx-1"></span>
                <span>Delete</span>
              </button>
              <button
                className="btn btn-sm btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                <span className="fa fa-times mx-1"></span>
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </ModalComponent>
    </div>
  );
}

EditPlannerEventModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

export default EditPlannerEventModal;
