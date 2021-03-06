import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import NoDataFound from "../../components/NoDataFound";
import { imgUrl } from "../../utils/utils";

function DashboardCalendarsList() {
  let [calendars, setCalenders] = React.useState([]);
  let calendarStore = useSelector((state) => state.CalendarStore);

  function getCalendars() {
    setCalenders(calendarStore.data);
  }

  React.useEffect(getCalendars, [calendarStore.status]);

  return (
    <div className="mb-5">
      <p className="mb-0 lead">
        {/* <span className="far fa-calendar-plus mr-1"></span> */}
        <img
          src={imgUrl("calendar-plus.png")}
          alt="Available calendars"
          className="icon-img"
        />
        <span>Available Calendars</span>
      </p>
      <hr />
      {calendars.length ? (
        <div className="row mx-auto">
          {calendars.map((cal, i) => (
            <div
              key={`cal_${cal.id}`}
              className="col-md-6 row align-items-center justify-content-start"
            >
              <div className="">

                <img
                  src={imgUrl("calendar.png")}
                  alt="Calendar Item"
                  className="icon-img-xl"
                />
              </div>
              <Link to={`/view/${cal.id}`} className="nav-link col" title={`Created by ${cal.user.name}<${cal.user.email}>`}>
                <p className="mb-0">
                  <span>{cal.title}</span>
                </p>
                <p className="small mb-0 text-muted">
                  {" "}
                  {cal.desc || "No description"}
                </p>
                <p className="mb-0 small text-muted">Created by {cal.user.name}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : calendarStore.status === "succeeded" && !calendarStore.data.length ? (
        <NoDataFound />
      ) : (
        <LoadingComponent text={"Loading calendars"} size={150} />
      )}
    </div>
  );
}

export default DashboardCalendarsList;
