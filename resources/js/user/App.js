import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppConfig from "./config/app-config"
import AppNavbar from "./components/AppNavbar";
import DashboardPage from "./Pages/DashboardPage"
import CalendarsPage from "./Pages/CalendarsPage";
import { startFetchingCalendars } from "../store/actions/calendar-actions";
import ViewCalendar from "./Pages/ViewCalendar";
import PlannerPage from "./Pages/PlannerPage";
import ProfilePage from "./Pages/ProfilePage";

function App({}) {
  let dispatch = useDispatch();
  let calendarStore = useSelector(state => state.CalendarStore);
  React.useEffect(() => {
    if(calendarStore.status == "idle") {
      dispatch(startFetchingCalendars());
    }
  }, [calendarStore.status])


  return (
    <div>
      <Router basename={AppConfig.baseUri}>
        <AppNavbar />
        <div className="container-fluid bg-white wrapper shadow pb-5">
          <Switch>
            <Route path="/" component={DashboardPage} exact/>
            <Route path="/calendars" component={CalendarsPage} />
            <Route path="/view/:id" component={ViewCalendar} />
            <Route path="/planners" component={PlannerPage} />
            <Route path='/profile' component={ProfilePage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}


/* const mapStateToProps = state => state;
export default connect(mapStateToProps)(App); */
export default App;
