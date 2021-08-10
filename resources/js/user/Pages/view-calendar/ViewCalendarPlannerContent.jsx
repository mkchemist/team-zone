import React from 'react'
import {Calendar, momentLocalizer} from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from "moment"
import PropTypes from 'prop-types';
import ViewCalendarEventComponent from './ViewCalendarEventComponent';
import { formatDate } from '../../../utils/date';


let localizer = momentLocalizer(moment);
let today  = new Date(new Date().toLocaleDateString("en-gb").split("/").reverse().join("-"))

function ViewCalendarPlannerContent({events}) {

  let [defaultDate, setDefaultDate] = React.useState(today)

  const onSelectSlotCallback = (data) => {
    let {slots} = data;
    let start, end;
    start = formatDate(slots[0])
    if(slots.length > 1) {
      end = formatDate(slots[slots.length - 1]);
    } else {
      end = formatDate(start)
    }

    console.log(start, end)

  }

  const onSelectEvent = (data,l,x) => {
    console.log(data, l, x)
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        components = {{
          event : ViewCalendarEventComponent
         }}
        defaultView={"month"}
        style={{ minHeight:500 }}
        defaultDate={defaultDate}
        onSelectSlot={onSelectSlotCallback}
        onSelectEvent={onSelectEvent}
        selectable={true}
      />
    </div>
  )
}


ViewCalendarPlannerContent.propTypes = {
  events: PropTypes.array.isRequired,
  planners: PropTypes.array.isRequired
}

export default ViewCalendarPlannerContent
