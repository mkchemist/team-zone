import React from 'react'
import DashboardCalendarsList from '../components/DashboardCalendarsList'
import DashboardIncomingEvents from '../components/DashboardIncomingEvents'
import DashboardSideNav from '../components/DashboardSideNav'

function DashboardPage() {
  return (
    <div>
      <div className="row mx-auto">
        <div className="col-lg-10 col-md-9 order-md-1 order-2 p-2">
          <DashboardCalendarsList />
          <DashboardIncomingEvents />
        </div>
        <div className="col-lg-2 col-md-3 order-md-2 order-1 p-2">
          <DashboardSideNav />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
