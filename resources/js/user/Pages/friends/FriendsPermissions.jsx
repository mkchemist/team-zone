import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import AddPermission from './AddPermission';
import EditPermission from './EditPermission';
import FriendsPermissionsHome from './FriendsPermissionsHome';

function FriendsPermissions() {
  let {path} = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={path} exact>
          <FriendsPermissionsHome />
        </Route>
        <Route path={`${path}/add`}>
          <AddPermission />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <EditPermission />
        </Route>
      </Switch>
    </div>
  )
}

export default FriendsPermissions
