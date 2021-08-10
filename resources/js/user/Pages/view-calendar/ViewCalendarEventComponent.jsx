import React from 'react'

function ViewCalendarEventComponent({event}) {
  return (
    <div style={{ backgroundColor: event.style.backgroundColor,color: event.style.color }}>
      <span className={event.style.icon}></span>
      <span>{event.title}</span>
    </div>
  )
}

export default ViewCalendarEventComponent
