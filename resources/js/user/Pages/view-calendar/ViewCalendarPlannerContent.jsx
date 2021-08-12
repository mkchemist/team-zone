import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import PropTypes from "prop-types";
import ViewCalendarEventComponent from "./ViewCalendarEventComponent";
import { formatDate } from "../../../utils/date";
import AddPlannerEventModal from "../../components/AddPlannerEventModal";
import EditPlannerEventModal from "../../components/EditPlannerEventModal";

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

  const onSelectSlotCallback = (data) => {
    let { slots } = data;
    let start, end;

    start = moment(slots[0]).format("YYYY-MM-DDThh:mm");
    end = moment(slots[slots.length - 1]).format("YYYY-MM-DDThh:mm");
    setStartDate(start);
    setEndDate(end);
    toggleAddModal(true);
  };

  const onSelectEvent = (data, e) => {
    setEditedEvent(data);
    setEditModal(true);
  };

  const onEditEvent = () => setEditedEvent(null);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        components={{
          event: ViewCalendarEventComponent,
        }}
        defaultView={"month"}
        style={{ height:'auto', minHeight:600  }}
        defaultDate={defaultDate}
        onSelectSlot={onSelectSlotCallback}
        onSelectEvent={onSelectEvent}
        selectable={true}
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
