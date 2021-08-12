import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import HttpService from "../../service/http-service";
import apiScheme from "../../constant/api-scheme";
import { startFetchingCalendars } from "../../store/actions/calendar-actions";
import { user } from "../../utils/utils";
import LoadingComponent from "../../components/LoadingComponent";
import NoDataFound from "../../components/NoDataFound";

const CalendarListItem = ({ calendar, deleteCalendar }) => {
  let currentUser = user;
  let [canEdit, setCanEdit] = React.useState(false);
  let [canDelete, setCanDelete] = React.useState(false);

  React.useEffect(() => {
    if (currentUser.id === calendar.user.id) {
      setCanEdit(true);
    }
  }, [currentUser]);

  return (
    <div className="border-bottom my-2 d-md-flex justify-content-between align-items-center">
      <div>
        <Link
          to={`/view/${calendar.id}`}
          className="text-decoration-none"
          title={`View calendar ${calendar.title}`}
        >
          <p className="mb-1">
            <span className="mr-1">{calendar.title}</span>
          </p>
        </Link>
        <p className="text-muted small mb-2">
          {calendar.desc || "No description"}
        </p>
      </div>
      {canEdit && (
        <div className="float-right btn-group btn-group-sm mb-2">
          <Link to={`/planners?calendar_id=${calendar.id}`} className="btn btn-sm btn-secondary">
            <span className="far fa-calendar-check mr-1"></span>
            <span>Planners</span>
          </Link>
          <Link
            to={`/calendars/edit/${calendar.id}`}
            className="btn btn-sm btn-secondary"
          >
            <span className="far fa-edit mx-1"></span>
            <span>edit</span>
          </Link>

          <a
            href="/"
            className="btn btn-sm btn-secondary"
            onClick={(e) => deleteCalendar(calendar)}
          >
            <span className="fa fa-trash mx-1"></span>
            <span>delete</span>
          </a>
        </div>
      )}
    </div>
  );
};

CalendarListItem.propTypes = {
  calendar: PropTypes.object.isRequired,
  deleteCalendar: PropTypes.func,
};

function CalendarsList() {
  let calendarStore = useSelector((state) => state.CalendarStore);
  let [calendars, setCalendars] = React.useState([]);
  let [searchKeyword, setSearchKeyword] = React.useState(null);
  let dispatch = useDispatch();

  function fetchCalendars() {
    if (searchKeyword) {
      let $cal = calendarStore.data.filter((cal) =>
        cal.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      setCalendars($cal);
    } else {
      setCalendars(calendarStore.data);
    }
  }
  function deleteCalendar(calendar) {
    window.event.preventDefault();

    Swal.fire({
      title: "Warning",
      icon: "warning",
      html: `<span class="small">Are you sure, you want to delete <b class="text-danger">${calendar.title}<b> calendar</span>`,
      showCancelButton: true,
      cancelButtonText: "Keep",
      confirmButtonText: `<span class="fa fa-trash"></span> Yes, delete`,
      confirmButtonColor: "#f54d4d",
      toast: true,
    }).then((res) => {
      if (res.isConfirmed) {
        let $cal = calendars.filter((cal) => cal.id !== calendar.id);
        let id = calendar.id;

        HttpService.delete(apiScheme.calendars + `/${id}`)
          .then(({ data }) => {
            //setCalendars($cal);
            dispatch(startFetchingCalendars());
            Swal.fire({
              title: "Success",
              icon: "success",
              toast: true,
              timer: 3000,
              timerProgressBar: true,
              html: `<span class="small">Calendar <b>${calendar.title}</b> deleted successfully</span>`,
            });
          })
          .catch((err) => console.log(err));
      }
    });
  }

  React.useEffect(() => {
    fetchCalendars();
  }, [searchKeyword, calendarStore.status]);

  if (calendarStore.statue === "succeeded" && !calendars.length) {
    return (
      <LoadingComponent
        text={"Loading all calendars"}
        size={40}
        type={"border"}
      />
    );
  }

  return (
    <div>
      <div className="my-2 px-0">
        <div className="px-0">
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Search calendars"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>
      <hr />
      {calendars.length ? (
        <div className="">
          {calendars.map((calendar) => (
            <CalendarListItem
              calendar={calendar}
              key={calendar.id}
              deleteCalendar={deleteCalendar}
            />
          ))}
        </div>
      ) : searchKeyword ? (
        <div className="text-center">
          <NoDataFound text={`Calendar ${searchKeyword} is not found`} />
          <Link to="/calendars/add" className="btn btn-sm btn-primary">
            <span className="fa fa-plus-circle mr-1"></span>
            <span>do you want to create it ?</span>
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <NoDataFound />
          <Link to="/calendars/add" className="btn btn-sm btn-primary">
            <span className="fa fa-plus-circle mr-1"></span>
            <span>add new calendar</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CalendarsList;
