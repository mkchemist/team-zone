import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import apiScheme from "../../constant/api-scheme";
import HttpService from "../../service/http-service";
import { calendarRequest } from "../../store/actions/view-calendar";
import ViewCalendarPlannerContent from "./view-calendar/ViewCalendarPlannerContent";
import ViewCalendarPlannerSelect from "./view-calendar/ViewCalendarPlannerSelect";

function ViewCalendar() {
  let dispatch = useDispatch();
  let viewCalendarStore = useSelector((state) => state.ViewCalendarStore);
  let { id } = useParams();
  let [planners, setPlanners] = React.useState([]);
  let [activePlannerList, setActivePlannerList] = React.useState([]);
  let [events, setEvents] = React.useState([]);

  function updateActivePlannerList(items) {
    setActivePlannerList(items);
  }

  React.useEffect(() => {
    if(viewCalendarStore.status === "idle" || viewCalendarStore.calendarId !== parseInt(id)) {
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
        calendar_id: id
      }
    }).then(({data}) => {
      let planners = data.data.map(planner => planner.title)
      setPlanners(data.data)
      setActivePlannerList(planners)
    }).catch(err => {
      console.log(err)
    })
  }, []);



  return (
    <div>
      <div className="row mx-auto">
        <div className="col-lg-2 p-2">
          <ViewCalendarPlannerSelect
            list={planners}
            onUpdate={updateActivePlannerList}
          />
          <div className="my-2">
           <BackButton />
          </div>
        </div>
        <div className="col-lg-10">
          <div className="p-2">
            <ViewCalendarPlannerContent events={events} planners={planners} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCalendar;
