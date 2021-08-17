import React from "react";
import { imgUrl } from "../../utils/utils";

function DashboardIncomingEvents() {
  let [events, setEvents] = React.useState([]);

  function fetchEvents() {
    // TODO should be removed after connection to api service
    let $events = [
      {
        title: "Conference",
        start: "2021-08-10",
        end: "2021-08-12",
        fav: true,
        style: {
          backgroundColor: "#180",
          color: "#fff",
          icon: "fa fa-chalkboard",
        },
        planners: {
          title: "Marketing",
        },
        calendar: {
          owner_name: "Alaa Adel"
        }
      },
      {
        title: "Training",
        start: "2021-08-15",
        end: "2021-08-15",
        fav: false,
        style: {
          backgroundColor: "royalblue",
          color: "#fff",
          icon: "fa fa-cogs",
        },
        planners: {
          title: "Training",
        },
        calendar: {
          owner_name: "Alaa Adel"
        }
      },
    ];

    setEvents($events);
  }

  React.useEffect(fetchEvents, []);

  return (
    <div className="my-3">
      <p className="mb-0 lead">
       {/*  <span className="far fa-calendar-check mr-1"></span> */}
       <img src={imgUrl('calendar-clock.png')} alt="upcoming events" className="icon-img" />
        <span>Upcoming Events</span>
      </p>
      <hr />
      <div className="my-2">
        {events.map(($e, i) => (
          <div
            key={`event_${$e.title}_${i}`}
            className="row mx-auto align-items-center my-2"
          >
            <div className="col-md-auto">
              <span className="fa-stack fa-2x">
                <span className="fa-stack-2x fa-circle fa" style={{ color: $e.style.backgroundColor }}></span>
                <span
                  className={`${$e.style.icon} fa-stack-1x`}
                  style={{ color: $e.style.color }}
                ></span>
              </span>
            </div>
            <div className="col-mg-10">
              <p className="mb-0">
                {$e.fav && (
                  <span className="fa fa-star text-warning mr-1"></span>
                )}
                <span>{$e.title}</span>
              </p>
              <p className="mb-0 text-muted small">
                {$e.start} - {$e.end}
              </p>
              <p className="mb-0 text-dark small">
                From <b>{$e.planners.title}</b> planner by <b>{$e.calendar.owner_name}</b>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardIncomingEvents;
