import React from 'react'
import { NavLink } from 'react-router-dom'


const tabs = [
  {
    title: "Home",
    path: "/calendars",
    icon: "fa fa-home"
  },
  {
    title: "Add",
    path: "/calendars/add",
    icon: "fa fa-plus-circle"
  }
]

function CalendarNav() {
  return (
    <ul className="nav nav-tabs">
      {tabs.map((tab, tabIndex) => (
        <li className="nav-item border rounded bg-light" key={`tab_${tabIndex}`}>
          <NavLink to={tab.path} className="nav-link small" exact activeClassName="active-tab">
            <span className={`${tab.icon} mr-1`}></span>
            <span>{tab.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default CalendarNav
