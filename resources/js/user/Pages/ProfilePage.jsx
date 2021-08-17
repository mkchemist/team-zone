import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ChangeProfilePictureComponent from "../../components/ChangeProfilePictureComponent";
import UserProfilePictureComponent from "../../components/UserProfilePictureComponent";
import { generateUrl } from "../../utils/utils";
import ProfileHome from "./profile/ProfileHome";
import ProfilePasswordPage from "./profile/ProfilePasswordPage";

function ProfilePage() {
  let { path } = useRouteMatch();
  let user = useSelector((state) => state.UserStore);

  return (
    <div className="p-2">
      <div className="row mx-auto">
        <div className="col-lg-2 col-md-3">
          <div className="">

            <UserProfilePictureComponent />
            <hr />
            <div className="my-2 d-md-block d-none">
              <ChangeProfilePictureComponent />
              <a href={generateUrl("logout")} className="btn btn-sm btn-block btn-danger">
                <span className="fa fa-door-open mr-1"></span>
                <span>Logout</span>
              </a>
              <BackButton />
            </div>
          </div>
        </div>
        <div className="col-lg-10 col-md-9">
          <ProfileHome />
          <ProfilePasswordPage />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
