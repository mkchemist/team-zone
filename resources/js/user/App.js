import { connect } from "react-redux";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { fetchingCalendarsFromApiService } from "../store/calendars/actions";
import AppConfig from "./config/app-config"

function App({dispatch}) {

  dispatch(fetchingCalendarsFromApiService({
    url: "calendars"
  }))

  return (
    <div>
      <Router basename={AppConfig.baseUri}>
        <h1>Hello,World</h1>
      </Router>
    </div>
  );
}


const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);
