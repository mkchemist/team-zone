import React from 'react'
import AsideNav from '../../components/AsideNav'

const items = [
  {
    title: "Add Calendar",
    path: "/calendars/add",
    icon: "fa fa-plus-circle mx-1"
  },
  {
    title: "Add Planner",
    path: "/planners/add",
    icon: "fa fa-plus-circle mx-1"
  },
  {
    title: "Add Friend",
    path: "/friends/add",
    icon: "fa fa-plus-circle mx-1"
  },
  {
    title: "Invite Friend",
    path: "/invite",
    icon: "fa fa-envelope mx-1"
  }
]

function DashboardSideNav() {
  return (
    <div className="p-2">
      <AsideNav items={items} />
    </div>
  )
}

export default DashboardSideNav
