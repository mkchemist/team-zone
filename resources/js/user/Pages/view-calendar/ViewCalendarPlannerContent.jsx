import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import PropTypes from "prop-types";
import ViewCalendarEventComponent from "./ViewCalendarEventComponent";
import AddPlannerEventModal from "../../components/AddPlannerEventModal";
import EditPlannerEventModal from "../../components/EditPlannerEventModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

let localizer = momentLocalizer(moment);
let today = new Date(
  new Date().toLocaleDateString("en-gb").split("/").reverse().join("-")
);



function ViewCalendarPlannerContent({ events }) {
  let [defaultDate] = React.useState(today);
  let [showAddModal, toggleAddModal] = React.useState(false);
  let [startDate, setStartDate] = React.useState(null);
  let [endDate, setEndDate] = React.useState(null);
  let [showEditModal, setEditModal] = React.useState(false);
  let [editedEvent, setEditedEvent] = React.useState(null);
  let user = useSelector(state => state.UserStore.data);
  let permissions = useSelector(state => state.PermissionsStore);
  let calendarsStore = useSelector(state => state.CalendarStore);
  let {id} = useParams()
  let [canUpdate, setCanUpdate] = React.useState(false);
  let [canCreate,setCanCreate] = React.useState(false);




  React.useEffect(() => {
    if(calendarsStore.status === 'succeeded') {
      let calendar = calendarsStore.data.filter(cal => cal.id === parseInt(id))[0];
      if(calendar.user.id === user.id) {
        setCanUpdate(true)
        setCanCreate(true)
      }
    }
    if(permissions.status === 'succeeded') {
      permissions.userPermissions.map(per => {
        if(per.calendar.id === parseInt(id) && ['modify', 'delete', 'restore'].includes(per.permission.toLowerCase())) {
          setCanUpdate(true)
        }
        if(per.calendar.id === parseInt(id) && ['create'].includes(per.permission.toLowerCase())) {
          setCanCreate(true)
        }
      })
    }

  }, [id, calendarsStore.status, permissions.status])

  const onSelectSlotCallback = (data) => {
    if(canUpdate === false && canCreate === false) {
      return;
    }


    let { slots } = data;
    let start, end;

    start = moment(slots[0]).format("YYYY-MM-DDThh:mm");
    end = moment(slots[slots.length - 1]).format("YYYY-MM-DDThh:mm");
    setStartDate(start);
    setEndDate(end);
    toggleAddModal(true);
  };

  const onSelectEvent = (data, e) => {
    if(!canUpdate && data.user.id !== user.id) {
      return;
    }
    setEditedEvent(data);
    setEditModal(true);
  };

  const onEditEvent = () => setEditedEvent(null);

  const TooltipAccessor = (event) => {
    return `
title: ${event.title}
from ${event.start} to ${event.end}
planner : ${event.planner.title}
created by : ${event.user.name}
By : ${event.who}
In: ${event.where}
content:
-------------------------------------------
${event.content}

    `;
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        components={{
          event: ViewCalendarEventComponent,
        }}
        defaultView={"month"}
        style={{ height: "auto", minHeight: 600 }}
        defaultDate={defaultDate}
        onSelectSlot={onSelectSlotCallback}
        onSelectEvent={onSelectEvent}
        selectable={true}
        tooltipAccessor={TooltipAccessor}
      />
      {startDate && endDate ? (
        <AddPlannerEventModal
          show={showAddModal}
          onClose={() => toggleAddModal(false)}
          start={startDate}
          end={endDate}
        />
      ) : null}
      {editedEvent ? (
        <EditPlannerEventModal
          show={showEditModal}
          onClose={(e) => setEditModal(false)}
          event={editedEvent}
        />
      ) : null}
    </div>
  );
}

ViewCalendarPlannerContent.propTypes = {
  events: PropTypes.array.isRequired,
  planners: PropTypes.array.isRequired,
};

export default ViewCalendarPlannerContent;
