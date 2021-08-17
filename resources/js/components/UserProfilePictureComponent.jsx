import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { defaultProfileImage, generateUrl, profileImage } from "../utils/utils";

function UserProfilePictureComponent({
  containerClass,
  borderColor,
  withUserData,
  imgClass,
  textClass,
  size
}) {
  let user = useSelector((state) => state.UserStore);
  return (
    <div className="text-center">
      <div className={`${containerClass} ${borderColor}`}>
        <img
          src={
            user.data.image
              ? profileImage(user.data.image.url)
              : defaultProfileImage()
          }
          alt={`${user.data.name} Profile Pic`}
          className={imgClass}
          style={{ width: size, height:170 }}
        />
      </div>
      {withUserData && <div>
        <p className={`${textClass} mb-1`}>{user.data.name}</p>
        <p className={`mb-1 small text-muted`}>{user.data.email}</p>
        </div>}
    </div>
  );
}

UserProfilePictureComponent.defaultProps = {
  containerClass: `rounded-circle p-1 border`,
  borderColor: '',
  withUserData: true,
  imgClass: `img-fluid rounded-circle`,
  textClass: `my-2 font-weight-bold`,
  size: 200
};

UserProfilePictureComponent.propTypes = {
  containerClass: PropTypes.string,
  borderColor: PropTypes.string,
  withUserData: PropTypes.bool,
  imgClass: PropTypes.string,
  textClass: PropTypes.string,
};

export default UserProfilePictureComponent;
