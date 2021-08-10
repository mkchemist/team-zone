import React from "react";
import { Link, Switch, useRouteMatch, Route } from "react-router-dom";
import BackButton from "../../components/BackButton";
import AddPlanner from "./planners/AddPlanner";
import EditPlanner from "./planners/EditPlanner";
import PlannerList from "./planners/PlannerList";

function PlannerPage() {
  let { path, url } = useRouteMatch();
  return (
    <div className="p-2">
      <div className="row mx-auto">
        <div className="col-lg-2 col-md-3">
          <div className="list-group list-group-flush">
            <Link
              to={url}
              className="list-group-item  text-dark text-decoration-none"
            >
              Planners List
            </Link>
            <Link
              to={`${url}/add`}
              className="list-group-item  text-dark text-decoration-none"
            >
              Add Planners
            </Link>
            <BackButton />
          </div>
        </div>
        <div className="col-lg-10 col-md-9">
          <Switch>
            <Route path={path} exact>
              <PlannerList />
            </Route>
            <Route path={`${path}/add`}>
              <AddPlanner />
            </Route>
            <Route path={`${path}/edit/:id`}>
              <EditPlanner />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default PlannerPage;
