import React from "react";
import { Link, Switch, useRouteMatch, Route } from "react-router-dom";
import useFriendsStore from "../../hooks/useFriendsStore";
import AddFriend from "./friends/AddFriend";
import FriendProfilePage from "./friends/FriendProfilePage";
import FriendsHome from "./friends/FriendsHome";
import FriendsPermissions from "./friends/FriendsPermissions";


export default function FriendsPage() {
  let {path} = useRouteMatch()
  let friendsStore = useFriendsStore()

  return (
    <div>
      <div className="row mx-auto p-2">
        <div className="col-lg-2 col-md-3">
          <div className="list-group list-group-flush">
            <Link
              to="/friends"
              className="list-group-item text-dark nav-link"
              title="View all friends list"
            >
              All Friends
            </Link>
            <Link
              to="/friends/add"
              className="list-group-item text-dark nav-link"
              title="add new friend"
            >
              Add Friend
            </Link>
            <Link
              to="/friends/permissions"
              className="list-group-item text-dark nav-link"
              title="assign a role of a friend"
            >
              Permissions
            </Link>
          </div>
        </div>
        <div className="col-lg-10 col-md-9">
          <Switch>
            <Route path={`${path}`} exact>
              <FriendsHome />
            </Route>
            <Route path={`${path}/add`} >
              <AddFriend />
            </Route>
            <Route path={`${path}/permissions`}>
              <FriendsPermissions />
            </Route>
            <Route path={`${path}/profile/:id`}>
              <FriendProfilePage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
