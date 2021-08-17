import React from 'react'
import { imgUrl } from '../../../utils/utils'
import CalendarsList from '../../components/CalendarsList'

function CalendarHome() {
  return (
    <div className="p-2">
      <p className="lead">
        {/* <span className="far fa-calendar-check  text-success mr-1"></span> */}
        <img src={imgUrl('calendar.png')} alt="Calendars home" className="icon-img mr-1" />
        <span>Calendars list</span>
      </p>
      <CalendarsList />
    </div>
  )
}

export default CalendarHome
