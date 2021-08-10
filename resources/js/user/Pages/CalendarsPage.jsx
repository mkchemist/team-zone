import React from 'react'
import { connect } from 'react-redux';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import AddCalendar from './calendars/AddCalendar';
import CalendarHome from './calendars/CalendarHome';
import EditCalendar from './calendars/EditCalendar';

function CalendarsPage() {
  let {path, url} = useRouteMatch()


  return (
    <div className="p-2">
      <div className="row mx-auto">
        <div className="col-lg-2 col-md-3">
          <div className="list-group list-group-flush">
            <Link to={url} className="list-group-item  text-dark text-decoration-none">
              <span>Calendar List</span>
            </Link>
            <Link to={`${url}/add`} className="list-group-item  text-dark text-decoration-none">
              <span>Add Calendar</span>
            </Link>
            <div>
              <BackButton />
            </div>
          </div>
        </div>
        <div className="col-lg-10 col-md-9">
          <Switch>
            <Route path={path} exact>
              <CalendarHome />
            </Route>
            <Route path={`${path}/add`} exact>
              <AddCalendar />
            </Route>
            <Route path={`${path}/edit/:id`}>
              <EditCalendar />
            </Route>
          </Switch>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}


const mapStateToProps = state => state;
export default connect(mapStateToProps)(CalendarsPage)
