import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import DownloadButton from "../../components/DownloadButton";
import apiScheme from "../../constant/api-scheme";
import HttpService from "../../service/http-service";
import { startFetchingCalendars } from "../../store/actions/calendar-actions";
import { calendarRequest } from "../../store/actions/view-calendar";
import { imgUrl } from "../../utils/utils";
import ViewCalendarPlannerContent from "./view-calendar/ViewCalendarPlannerContent";
import ViewCalendarPlannerSelect from "./view-calendar/ViewCalendarPlannerSelect";

function ViewCalendar() {
  let dispatch = useDispatch();
  let viewCalendarStore = useSelector((state) => state.ViewCalendarStore);
  let { id } = useParams();
  let [planners, setPlanners] = React.useState([]);
  let [activePlannerList, setActivePlannerList] = React.useState([]);
  let [events, setEvents] = React.useState([]);
  let calendarStore = useSelector((state) => state.CalendarStore);
  let [currentViewCalendar, setCurrentViewCalendar] = React.useState(null);

  function updateActivePlannerList(items) {
    setActivePlannerList(items);
  }

  React.useEffect(() => {
    if (
      viewCalendarStore.status === "idle" ||
      viewCalendarStore.calendarId !== parseInt(id)
    ) {
      dispatch(
        calendarRequest({
          id,
        })
      );
    }
  }, [viewCalendarStore.status, viewCalendarStore.id]);

  React.useEffect(() => {
    let $events = viewCalendarStore.events.filter((e) =>
      activePlannerList.includes(e.planner.title)
    );
    setEvents($events);
  }, [activePlannerList, viewCalendarStore.events.length]);

  React.useEffect(() => {
    HttpService.get(apiScheme.planners, {
      params: {
        calendar_id: id,
      },
    })
      .then(({ data }) => {
        let planners = data.data.map((planner) => planner.title);
        setPlanners(data.data);
        setActivePlannerList(planners);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if (calendarStore.status === "idle") {
      dispatch(startFetchingCalendars());
    }
    let matchedCalendars = calendarStore.data.filter(
      (cal) => cal.id === parseInt(id)
    );
    if (matchedCalendars.length) {
      setCurrentViewCalendar(matchedCalendars[0]);
    }
  }, [calendarStore.status, id]);

  return (
    <div>
      <div className="row mx-auto">
        <div className="col-lg-2 col-md-3 p-2">
          <ViewCalendarPlannerSelect
            list={planners}
            onUpdate={updateActivePlannerList}
          />
          <div className="my-2">
            {currentViewCalendar && (
              <DownloadButton
                data={events}
                keys={["start", "end", "title", "who", "where", "content"]}
                name={`${currentViewCalendar.title}`}
                buttons={['pdf', 'excel']}
              />
            )}
            <BackButton />
          </div>
        </div>
        <div className="col-lg-10 col-md-9">
          <div className="p-2">
            {currentViewCalendar ? (
              <p className="lead">
                <img
                  src={imgUrl("calendar.png")}
                  alt={`Calendar ${currentViewCalendar.title}`}
                  className="icon-img mr-1"
                />
                <span className="text-primary">
                  {currentViewCalendar.title}
                </span>
              </p>
            ) : null}
            <hr />
            <ViewCalendarPlannerContent events={events} planners={planners} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCalendar;
