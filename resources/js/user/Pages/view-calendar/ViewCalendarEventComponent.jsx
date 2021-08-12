import React from "react";
import { defaultProfileImage, profileImage } from "../../../utils/utils";

function ViewCalendarEventComponent({ event }) {
  return (
    <div
      style={{
        backgroundColor: event.style.backgroundColor,
        color: event.style.color,
      }}
      className="shadow rounded d-flex align-items-center justify-content-between"
    >
      <div>
        {event.fav && <span className="fa fa-star text-warning"></span>}
        <span className={`${event.style.icon} mx-1`}></span>
        <span className="font-weight-bold">{event.title}</span>
      </div>
      <img
        src={
          event.user.img ? profileImage(event.user.img) : defaultProfileImage()
        }
        alt=""
        className="rounded-circle"
        style={{ width: 25 }}
      />
    </div>
  );
}

export default ViewCalendarEventComponent;
